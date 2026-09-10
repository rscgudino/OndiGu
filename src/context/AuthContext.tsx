import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, formatAuthError } from '../lib/supabase';
import { UserProfile } from '../types';
import { isUserAdmin, sincronizarClienteRegistrado } from '../lib/agendaService';

interface SignUpParams {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  isLocalMode: boolean;
  setLocalMode: (val: boolean) => void;
  signUp: (params: SignUpParams) => Promise<{ error?: string; requiresEmailConfirmation?: boolean; canFallbackToDemo?: boolean }>;
  signIn: (params: SignInParams) => Promise<{ error?: string; canFallbackToDemo?: boolean }>;
  signInWithGoogle: () => Promise<{ error?: string }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name: string; phone: string }) => Promise<{ error?: string }>;
  signUpLocalDemo: (params: SignUpParams) => Promise<{ error?: string }>;
}

const LOCAL_STORAGE_SESSION_KEY = 'ondigu_local_auth_session';
const LOCAL_STORAGE_USERS_KEY = 'ondigu_local_auth_users';
const LOCAL_STORAGE_FORCE_DEMO_KEY = 'ondigu_force_demo_mode';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocalMode, setIsLocalMode] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_FORCE_DEMO_KEY) === 'true';
  });

  const setLocalMode = (val: boolean) => {
    setIsLocalMode(val);
    if (val) {
      localStorage.setItem(LOCAL_STORAGE_FORCE_DEMO_KEY, 'true');
    } else {
      localStorage.removeItem(LOCAL_STORAGE_FORCE_DEMO_KEY);
    }
  };

  // Helper local signup
  const registerLocalUser = (params: SignUpParams) => {
    const { email, password, name, phone } = params;
    const usersStr = localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]';
    const users = JSON.parse(usersStr);

    const existing = users.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      return { error: 'Este correo electrónico ya está registrado. Probá iniciar sesión.' };
    }

    const adminStatus = isUserAdmin(email);
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email: email.trim(),
      name: name.trim(),
      phone: phone ? phone.trim() : '',
      createdAt: new Date().toISOString(),
      role: adminStatus ? 'admin' : 'cliente',
      status: 'activo',
      isAdmin: adminStatus,
    };

    sincronizarClienteRegistrado({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      role: newUser.role,
      status: 'activo'
    });

    users.push({ ...newUser, password });
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return {};
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (!isLocalMode && isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            const userEmail = session.user.email || '';
            const adminStatus = isUserAdmin(userEmail);
            const profile: UserProfile = {
              id: session.user.id,
              email: userEmail,
              name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Cliente',
              phone: session.user.user_metadata?.phone || '',
              avatarUrl: session.user.user_metadata?.avatar_url,
              createdAt: session.user.created_at,
              isAdmin: adminStatus,
              role: adminStatus ? 'admin' : 'cliente',
            };
            setUser(profile);
            sincronizarClienteRegistrado(profile);
          }

          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;
            if (session?.user) {
              const userEmail = session.user.email || '';
              const adminStatus = isUserAdmin(userEmail);
              const profile: UserProfile = {
                id: session.user.id,
                email: userEmail,
                name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Cliente',
                phone: session.user.user_metadata?.phone || '',
                avatarUrl: session.user.user_metadata?.avatar_url,
                createdAt: session.user.created_at,
                isAdmin: adminStatus,
                role: adminStatus ? 'admin' : 'cliente',
              };
              setUser(profile);
              sincronizarClienteRegistrado(profile);
            } else {
              setUser(null);
            }
          });

          return () => {
            subscription.unsubscribe();
          };
        } catch (err) {
          console.error('Error al inicializar sesión de Supabase:', err);
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        // Fallback local storage for preview / dev
        try {
          const savedSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
          if (savedSession) {
            const parsed = JSON.parse(savedSession);
            if (parsed?.id && mounted) {
              parsed.isAdmin = isUserAdmin(parsed.email);
              setUser(parsed);
              sincronizarClienteRegistrado(parsed);
            }
          }
        } catch (e) {
          console.error('Error leyendo sesión local:', e);
        } finally {
          if (mounted) setLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, [isLocalMode]);

  // 1. Registro
  const signUp = async ({ email, password, name, phone }: SignUpParams) => {
    if (!email || !password || !name) {
      return { error: 'Por favor completá todos los campos requeridos.' };
    }
    if (password.length < 6) {
      return { error: 'La contraseña debe tener un mínimo de 6 caracteres.' };
    }

    if (!isLocalMode && isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              phone: phone ? phone.trim() : '',
            },
          },
        });

        if (error) {
          const formatted = formatAuthError(error);
          return { error: formatted, canFallbackToDemo: true };
        }

        if (data.session?.user) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || email,
            name: data.session.user.user_metadata?.full_name || name,
            phone: data.session.user.user_metadata?.phone || phone || '',
            createdAt: data.session.user.created_at,
          });
          return {};
        }

        return { requiresEmailConfirmation: true };
      } catch (err: any) {
        return { error: formatAuthError(err), canFallbackToDemo: true };
      }
    }

    // Modo local / preview
    try {
      return registerLocalUser({ email, password, name, phone });
    } catch (e) {
      return { error: 'Error guardando datos en almacenamiento local.' };
    }
  };

  const signUpLocalDemo = async (params: SignUpParams) => {
    setLocalMode(true);
    return registerLocalUser(params);
  };

  // 2. Login con email y contraseña
  const signIn = async ({ email, password }: SignInParams) => {
    if (!email || !password) {
      return { error: 'Por favor ingresá tu correo y contraseña.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          return { error: formatAuthError(error) };
        }

        if (data.user) {
          const userEmail = data.user.email || email;
          const adminStatus = isUserAdmin(userEmail);
          const profile: UserProfile = {
            id: data.user.id,
            email: userEmail,
            name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0],
            phone: data.user.user_metadata?.phone || '',
            avatarUrl: data.user.user_metadata?.avatar_url,
            createdAt: data.user.created_at,
            isAdmin: adminStatus,
            role: adminStatus ? 'admin' : 'cliente',
          };
          setUser(profile);
          sincronizarClienteRegistrado(profile);
        }
        return {};
      } catch (err: any) {
        return { error: formatAuthError(err) };
      }
    }

    // Modo local / preview
    try {
      const usersStr = localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]';
      const users = JSON.parse(usersStr);

      const found = users.find(
        (u: any) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );

      if (!found) {
        return { error: 'Email o contraseña incorrectos.' };
      }

      const adminStatus = isUserAdmin(found.email);
      const profile: UserProfile = {
        id: found.id,
        email: found.email,
        name: found.name,
        phone: found.phone || '',
        createdAt: found.createdAt,
        isAdmin: adminStatus,
        role: adminStatus ? 'admin' : 'cliente',
      };

      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(profile));
      setUser(profile);
      sincronizarClienteRegistrado(profile);
      return {};
    } catch (e) {
      return { error: 'Error al iniciar sesión local.' };
    }
  };

  // 3. Login con Google
  const signInWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) {
          return { error: formatAuthError(error) };
        }
        return {};
      } catch (err: any) {
        return { error: formatAuthError(err) };
      }
    }

    // Modo local: simular login Google
    const dummyEmail = 'cliente.google@gmail.com';
    const adminStatus = isUserAdmin(dummyEmail);
    const dummyGoogleUser: UserProfile = {
      id: 'usr_google_' + Date.now(),
      email: dummyEmail,
      name: 'Cliente Google',
      phone: '+54 9 11 4000-1122',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      createdAt: new Date().toISOString(),
      isAdmin: adminStatus,
      role: adminStatus ? 'admin' : 'cliente',
    };
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(dummyGoogleUser));
    setUser(dummyGoogleUser);
    sincronizarClienteRegistrado(dummyGoogleUser);
    return {};
  };

  // 4. Recuperación de contraseña
  const resetPassword = async (email: string) => {
    if (!email || !email.includes('@')) {
      return { error: 'Por favor ingresá un correo electrónico válido.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/#restablecer-clave`,
        });
        if (error) {
          return { error: formatAuthError(error) };
        }
        return {};
      } catch (err: any) {
        return { error: formatAuthError(err) };
      }
    }

    // Modo local
    const usersStr = localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]';
    const users = JSON.parse(usersStr);
    const exists = users.some((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists && users.length > 0) {
      return { error: 'No encontramos ninguna cuenta con ese correo.' };
    }
    return {};
  };

  // 5. Cerrar sesión
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error al cerrar sesión en Supabase:', err);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    setUser(null);
  };

  // 6. Actualizar perfil
  const updateProfile = async (data: { name: string; phone: string }) => {
    if (!user) return { error: 'No hay sesión activa.' };
    if (!data.name.trim()) return { error: 'El nombre no puede estar vacío.' };

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            full_name: data.name.trim(),
            phone: data.phone.trim(),
          },
        });

        if (error) {
          return { error: formatAuthError(error) };
        }

        setUser((prev) => (prev ? { ...prev, name: data.name.trim(), phone: data.phone.trim() } : null));
        return {};
      } catch (err: any) {
        return { error: formatAuthError(err) };
      }
    }

    // Modo local
    try {
      const updatedUser: UserProfile = {
        ...user,
        name: data.name.trim(),
        phone: data.phone.trim(),
      };
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(updatedUser));

      // Actualizar también en lista local
      const usersStr = localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]';
      const users = JSON.parse(usersStr);
      const idx = users.findIndex((u: any) => u.id === user.id || u.email === user.email);
      if (idx !== -1) {
        users[idx].name = data.name.trim();
        users[idx].phone = data.phone.trim();
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
      }

      setUser(updatedUser);
      return {};
    } catch (e) {
      return { error: 'Error actualizando perfil local.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        signUp,
        signIn,
        signInWithGoogle,
        resetPassword,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};

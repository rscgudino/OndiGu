import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project') &&
  supabaseAnonKey !== 'your-anon-key'
);

// Initialize client if valid credentials, otherwise null to allow fallback mode
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Traduce los errores de autenticación de Supabase a mensajes claros y en español.
 */
export function formatAuthError(error: any): string {
  if (!error) return 'Ocurrió un error inesperado.';

  const message = (typeof error === 'string' ? error : error.message || '').toLowerCase();

  if (message.includes('invalid login credentials') || message.includes('invalid credentials')) {
    return 'Email o contraseña incorrectos.';
  }
  if (message.includes('user already registered') || message.includes('already exists')) {
    return 'Este correo electrónico ya está registrado. Probá iniciar sesión.';
  }
  if (message.includes('password should be at least 6 characters') || message.includes('least 6 characters')) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  if (message.includes('email not confirmed')) {
    return 'Por favor confirmá tu correo electrónico antes de ingresar (revisá tu casilla o spam).';
  }
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Demasiados intentos seguidos. Por favor esperá unos minutos.';
  }
  if (message.includes('user not found')) {
    return 'No encontramos una cuenta registrada con este correo.';
  }
  if (message.includes('invalid email') || message.includes('unable to validate email')) {
    return 'Por favor ingresá un formato de correo electrónico válido.';
  }
  if (message.includes('network') || message.includes('fetch')) {
    return 'Error de conexión. Verificá tu acceso a internet.';
  }

  return error.message || 'No se pudo completar la operación. Por favor intentá nuevamente.';
}

export type { User, Session };

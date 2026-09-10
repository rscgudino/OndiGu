import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

function sanitizeSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  let url = rawUrl.trim();

  // Si el usuario copió la URL del panel de control de Supabase (ej: https://supabase.com/dashboard/project/abcdefgh...)
  const dashboardMatch = url.match(/\/project\/([a-zA-Z0-9_-]+)/);
  if (dashboardMatch && dashboardMatch[1]) {
    return `https://${dashboardMatch[1]}.supabase.co`;
  }

  // Quitar barras finales y subrutas como /auth/v1 o /rest/v1
  url = url.replace(/\/+$/, '');
  url = url.replace(/\/(auth|rest)\/v\d+.*$/, '');

  return url;
}

function sanitizeKey(rawKey?: string): string {
  if (!rawKey) return '';
  return rawKey.trim();
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
const supabaseAnonKey = sanitizeKey(rawAnonKey);

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

  if (message.includes('invalid path') || message.includes('invalid url')) {
    return 'La URL del proyecto Supabase es incorrecta o tiene una ruta no válida. Asegurate de usar el formato "https://<id-proyecto>.supabase.co" (se obtiene en Settings > API > Project URL), sin subcarpetas ni la URL del panel.';
  }
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
  if (message.includes('network') || message.includes('fetch') || message.includes('failed to fetch')) {
    return 'Error de conexión con el servidor de autenticación. Verificá que la URL y clave anon de Supabase sean correctas.';
  }

  return error.message || 'No se pudo completar la operación. Por favor intentá nuevamente.';
}

export type { User, Session };

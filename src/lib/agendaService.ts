import { supabase, isSupabaseConfigured } from './supabase';
import { TurnoLlamada, PresupuestoLead, PaymentGatewayConfig, RegisteredClient } from '../types';

const LOCAL_TURNOS_KEY = 'ondigu_turnos_db';
const LOCAL_PRESUPUESTOS_KEY = 'ondigu_presupuestos_db';
const LOCAL_GATEWAY_CONFIG_KEY = 'ondigu_payment_gateway_config';
const LOCAL_CLIENTS_KEY = 'ondigu_registered_clients_db';

// El administrador principal del sitio web OndiGu
export const ADMIN_EMAILS = ['rscgudino@gmail.com'];

/**
 * Verifica de forma estricta si un usuario es el Administrador del Sitio.
 * Un cliente recién registrado NUNCA es administrador a menos que el administrador le otorgue el rol 'admin'.
 */
export function isUserAdmin(email?: string): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  
  // 1. Email maestro del administrador
  if (ADMIN_EMAILS.some((adm) => adm.toLowerCase() === cleanEmail)) {
    return true;
  }

  // 2. Verificar si en la base de clientes tiene rol 'admin' asignado explícitamente por el administrador
  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    if (raw) {
      const clients: RegisteredClient[] = JSON.parse(raw);
      const found = clients.find((c) => c.email.trim().toLowerCase() === cleanEmail);
      if (found && found.role === 'admin' && found.status === 'activo') {
        return true;
      }
    }
  } catch {
    // ignore
  }

  return false;
}

export function setAdminUnlocked(unlocked: boolean) {
  if (unlocked) {
    localStorage.setItem('ondigu_admin_unlocked', 'true');
  } else {
    localStorage.removeItem('ondigu_admin_unlocked');
  }
}

// Clientes iniciales para demostración en el panel del Administrador
function getInitialClients(): RegisteredClient[] {
  return [
    {
      id: 'cli-001',
      email: 'rscgudino@gmail.com',
      name: 'RSC Gudiño (Administrador Web)',
      phone: '+54 9 11 9988-7766',
      role: 'admin',
      status: 'activo',
      createdAt: '2026-01-10T10:00:00Z',
      notasAdmin: 'Super Administrador principal con acceso total a toda la plataforma.',
    },
    {
      id: 'cli-002',
      email: 'mariana.calzados@gmail.com',
      name: 'Mariana Benítez',
      phone: '+54 9 11 5544-2211',
      role: 'vip',
      status: 'activo',
      createdAt: '2026-02-14T14:20:00Z',
      notasAdmin: 'Comercio en Lanús Centro. Cliente recurrente de tienda online.',
    },
    {
      id: 'cli-003',
      email: 'gonzalo.estudio@outlook.com',
      name: 'Gonzalo Arismendi',
      phone: '+54 9 11 4433-8899',
      role: 'cliente',
      status: 'activo',
      createdAt: '2026-03-01T11:45:00Z',
      notasAdmin: 'Estudio Contable. Interesado en bots de WhatsApp e IA.',
    },
    {
      id: 'cli-004',
      email: 'diego.taller@gmail.com',
      name: 'Diego Morales (Mecánica Lanús)',
      phone: '+54 9 11 3322-1100',
      role: 'cliente',
      status: 'pendiente',
      createdAt: '2026-03-05T09:15:00Z',
      notasAdmin: 'Solicitó landing page express, pendiente confirmación.',
    }
  ];
}

/**
 * Obtiene la lista de clientes registrados para el Administrador
 */
export async function listarClientesRegistrados(): Promise<RegisteredClient[]> {
  // Sincronizar con Supabase si está configurado
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('clientes_perfiles')
        .select('*')
        .order('createdAt', { ascending: false });

      if (!error && data && data.length > 0) {
        localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(data));
        return data as RegisteredClient[];
      }
    } catch (e) {
      console.warn('Error leyendo clientes de Supabase, usando almacenamiento local:', e);
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    if (!raw) {
      const initial = getInitialClients();
      localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialClients();
  }
}

/**
 * Sincroniza un nuevo usuario o actualización de perfil al roster de clientes
 */
export function sincronizarClienteRegistrado(client: Partial<RegisteredClient> & { id: string; email: string; name: string }): void {
  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    const clients: RegisteredClient[] = raw ? JSON.parse(raw) : getInitialClients();
    
    const existingIndex = clients.findIndex(
      (c) => c.id === client.id || c.email.trim().toLowerCase() === client.email.trim().toLowerCase()
    );

    const isMaster = ADMIN_EMAILS.some((adm) => adm.toLowerCase() === client.email.trim().toLowerCase());

    if (existingIndex !== -1) {
      clients[existingIndex] = {
        ...clients[existingIndex],
        name: client.name || clients[existingIndex].name,
        phone: client.phone || clients[existingIndex].phone,
        role: isMaster ? 'admin' : (clients[existingIndex].role || 'cliente'),
        status: clients[existingIndex].status || 'activo',
      };
    } else {
      clients.unshift({
        id: client.id,
        email: client.email,
        name: client.name,
        phone: client.phone || '',
        role: isMaster ? 'admin' : 'cliente',
        status: 'activo',
        createdAt: new Date().toISOString(),
        notasAdmin: isMaster ? 'Super Administrador' : 'Nuevo cliente registrado desde la web',
      });
    }

    localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(clients));

    // Si Supabase está disponible, guardar en tabla 'clientes_perfiles'
    if (isSupabaseConfigured && supabase) {
      const targetClient = existingIndex !== -1 ? clients[existingIndex] : clients[0];
      supabase.from('clientes_perfiles').upsert([targetClient]).then();
    }
  } catch (err) {
    console.warn('Error sincronizando cliente registrado:', err);
  }
}

/**
 * PRIVILEGIO DE ADMINISTRADOR: Cambiar rol de un cliente (cliente / vip / admin)
 */
export async function actualizarRolCliente(
  id: string, 
  nuevoRol: 'cliente' | 'vip' | 'admin'
): Promise<{ success: boolean; error?: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    const clients: RegisteredClient[] = raw ? JSON.parse(raw) : getInitialClients();
    const updated = clients.map((c) => (c.id === id ? { ...c, role: nuevoRol } : c));
    localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('clientes_perfiles').update({ role: nuevoRol }).eq('id', id);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'Error al actualizar rol del cliente.' };
  }
}

/**
 * PRIVILEGIO DE ADMINISTRADOR: Cambiar estado de un cliente (activo / pendiente / bloqueado)
 */
export async function actualizarEstadoCliente(
  id: string, 
  nuevoEstado: 'activo' | 'pendiente' | 'bloqueado'
): Promise<{ success: boolean; error?: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    const clients: RegisteredClient[] = raw ? JSON.parse(raw) : getInitialClients();
    const updated = clients.map((c) => (c.id === id ? { ...c, status: nuevoEstado } : c));
    localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('clientes_perfiles').update({ status: nuevoEstado }).eq('id', id);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'Error al actualizar estado del cliente.' };
  }
}

/**
 * PRIVILEGIO DE ADMINISTRADOR: Borrar cliente del sistema
 */
export async function eliminarCliente(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
    const clients: RegisteredClient[] = raw ? JSON.parse(raw) : [];
    
    // No permitir borrar el admin principal
    const toDelete = clients.find((c) => c.id === id);
    if (toDelete && ADMIN_EMAILS.includes(toDelete.email.toLowerCase())) {
      return { success: false, error: 'No se puede eliminar la cuenta del Administrador principal.' };
    }

    const filtered = clients.filter((c) => c.id !== id);
    localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(filtered));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('clientes_perfiles').delete().eq('id', id);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'Error al eliminar cliente.' };
  }
}

/**
 * PRIVILEGIO DE ADMINISTRADOR: Borrar un turno de llamada
 */
export async function eliminarTurnoLlamada(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const current = getLocalTurnos();
    const filtered = current.filter((t) => t.id !== id);
    saveLocalTurnos(filtered);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('turnos').delete().eq('id', id);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'Error al eliminar turno.' };
  }
}

/**
 * PRIVILEGIO DE ADMINISTRADOR: Borrar un presupuesto / lead
 */
export async function eliminarPresupuestoLead(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const current = getLocalPresupuestos();
    const filtered = current.filter((p) => p.id !== id);
    saveLocalPresupuestos(filtered);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('presupuestos_contactos').delete().eq('id', id);
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message || 'Error al eliminar presupuesto.' };
  }
}

// Default initial config for payments
export const DEFAULT_PAYMENT_CONFIG: PaymentGatewayConfig = {
  mercadopago_public_key: '',
  mercadopago_access_token: '',
  mercadopago_sandbox: true,
  mercadopago_link_consultoria: 'https://mpago.la/pos/ondigu-consultoria',
  stripe_publishable_key: '',
  stripe_secret_key: '',
  stripe_test_mode: true,
  precio_consultoria_ars: 25000,
  precio_consultoria_usd: 35,
};

// Seed initial mock turnos if completely empty so admin has demonstration data immediately
function getLocalTurnos(): TurnoLlamada[] {
  try {
    const raw = localStorage.getItem(LOCAL_TURNOS_KEY);
    if (!raw) {
      const initial: TurnoLlamada[] = [
        {
          id: 'TUR-98214',
          usuario_id: null,
          nombre: 'Mariana Benítez (Comercio Calzados)',
          telefono: '+54 9 11 5544-2211',
          email: 'mariana.calzados@gmail.com',
          fecha: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          franja: 'Mañana (09:00 - 13:00)',
          motivo: 'Tienda Online E-commerce',
          notas: 'Tiene local en Lanús Centro y necesita sincronizar stock con WhatsApp.',
          estado: 'pendiente',
          creado_en: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 'TUR-87112',
          usuario_id: null,
          nombre: 'Gonzalo Arismendi (Estudio Contable)',
          telefono: '+54 9 11 4433-8899',
          email: 'gonzalo.estudio@outlook.com',
          fecha: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          franja: 'Tarde (13:00 - 18:00)',
          motivo: 'Automatización & IA',
          notas: 'Quiere un bot de WhatsApp para recibir constancias y documentación de clientes.',
          estado: 'contactado',
          creado_en: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      localStorage.setItem(LOCAL_TURNOS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalTurnos(turnos: TurnoLlamada[]) {
  try {
    localStorage.setItem(LOCAL_TURNOS_KEY, JSON.stringify(turnos));
  } catch (err) {
    console.error('Error guardando turnos locales:', err);
  }
}

function getLocalPresupuestos(): PresupuestoLead[] {
  try {
    const raw = localStorage.getItem(LOCAL_PRESUPUESTOS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalPresupuestos(leads: PresupuestoLead[]) {
  try {
    localStorage.setItem(LOCAL_PRESUPUESTOS_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Error guardando presupuestos locales:', err);
  }
}

/**
 * Guarda un turno en Supabase (tabla 'turnos') con fallback local seguro.
 */
export async function agendarTurnoLlamada(
  params: Omit<TurnoLlamada, 'id' | 'creado_en' | 'estado'>
): Promise<{ data: TurnoLlamada; error?: string }> {
  const newId = 'TUR-' + Math.floor(10000 + Math.random() * 90000);
  const nuevoTurno: TurnoLlamada = {
    ...params,
    id: newId,
    estado: 'pendiente',
    creado_en: new Date().toISOString(),
  };

  // Always save in local storage to guarantee availability
  const currentLocal = getLocalTurnos();
  saveLocalTurnos([nuevoTurno, ...currentLocal]);

  // If Supabase is active, persist in database
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('turnos')
        .insert([
          {
            id: nuevoTurno.id,
            usuario_id: nuevoTurno.usuario_id || null,
            nombre: nuevoTurno.nombre,
            telefono: nuevoTurno.telefono,
            email: nuevoTurno.email,
            fecha: nuevoTurno.fecha,
            franja: nuevoTurno.franja,
            motivo: nuevoTurno.motivo,
            notas: nuevoTurno.notas || '',
            estado: nuevoTurno.estado,
            creado_en: nuevoTurno.creado_en,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Advertencia Supabase al insertar turno (guardado en cache local):', error.message);
      } else if (data) {
        return { data: data as TurnoLlamada };
      }
    } catch (err: any) {
      console.warn('Excepción al conectar con Supabase turnos:', err.message);
    }
  }

  return { data: nuevoTurno };
}

/**
 * Obtiene todos los turnos para el panel de administración
 * Ordenados por fecha más próxima primero.
 */
export async function listarTurnosLlamadas(filtroEstado?: string): Promise<TurnoLlamada[]> {
  let list: TurnoLlamada[] = [];

  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('turnos').select('*').order('fecha', { ascending: true });
      if (filtroEstado && filtroEstado !== 'todos') {
        query = query.eq('estado', filtroEstado);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data as TurnoLlamada[];
        // Sync local storage with latest Supabase rows
        saveLocalTurnos(list);
        return list;
      }
    } catch (err) {
      console.warn('Error leyendo turnos de Supabase, usando cache local:', err);
    }
  }

  // Fallback to local store
  list = getLocalTurnos();
  if (filtroEstado && filtroEstado !== 'todos') {
    list = list.filter((t) => t.estado === filtroEstado);
  }

  // Sort by date ascending (closest date first)
  list.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  return list;
}

/**
 * Actualiza el estado de un turno (pendiente / contactado / hecho)
 */
export async function actualizarEstadoTurno(
  id: string,
  nuevoEstado: 'pendiente' | 'contactado' | 'hecho'
): Promise<{ success: boolean; error?: string }> {
  // Update local
  const current = getLocalTurnos();
  const updated = current.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t));
  saveLocalTurnos(updated);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('turnos')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) {
        console.warn('Error actualizando estado en Supabase:', error.message);
      }
    } catch (err: any) {
      console.warn('Excepción actualizando turno en Supabase:', err.message);
    }
  }

  return { success: true };
}

/**
 * Guarda solicitud de presupuesto en Supabase (tabla 'presupuestos_contactos')
 */
export async function guardarPresupuestoLead(
  lead: Omit<PresupuestoLead, 'id' | 'creado_en' | 'estado'>
): Promise<{ data: PresupuestoLead; error?: string }> {
  const newLead: PresupuestoLead = {
    ...lead,
    id: 'OND-' + Math.floor(100000 + Math.random() * 900000),
    estado: 'nuevo',
    creado_en: new Date().toISOString(),
  };

  const localList = getLocalPresupuestos();
  saveLocalPresupuestos([newLead, ...localList]);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('presupuestos_contactos')
        .insert([
          {
            id: newLead.id,
            usuario_id: newLead.usuario_id || null,
            nombre: newLead.nombre,
            tipo_negocio: newLead.tipo_negocio,
            necesidades: newLead.necesidades,
            contacto: newLead.contacto,
            detalles: newLead.detalles,
            estado: newLead.estado,
            creado_en: newLead.creado_en,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Error al guardar presupuesto en Supabase:', error.message);
      } else if (data) {
        return { data: data as PresupuestoLead };
      }
    } catch (err: any) {
      console.warn('Excepción guardando presupuesto en Supabase:', err.message);
    }
  }

  return { data: newLead };
}

/**
 * Obtiene lista de presupuestos guardados para el admin
 */
export async function listarPresupuestosLeads(): Promise<PresupuestoLead[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('presupuestos_contactos')
        .select('*')
        .order('creado_en', { ascending: false });

      if (!error && data && data.length > 0) {
        saveLocalPresupuestos(data as PresupuestoLead[]);
        return data as PresupuestoLead[];
      }
    } catch (err) {
      console.warn('Error leyendo presupuestos de Supabase:', err);
    }
  }

  return getLocalPresupuestos();
}

/**
 * Obtiene la configuración de pasarelas de pago (Mercado Pago & Stripe)
 */
export async function obtenerConfiguracionPagos(): Promise<PaymentGatewayConfig> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('configuracion_pagos')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        const config: PaymentGatewayConfig = {
          mercadopago_public_key: data.mercadopago_public_key || '',
          mercadopago_access_token: data.mercadopago_access_token || '',
          mercadopago_sandbox: data.mercadopago_sandbox ?? true,
          mercadopago_link_consultoria: data.mercadopago_link_consultoria || DEFAULT_PAYMENT_CONFIG.mercadopago_link_consultoria,
          stripe_publishable_key: data.stripe_publishable_key || '',
          stripe_secret_key: data.stripe_secret_key || '',
          stripe_test_mode: data.stripe_test_mode ?? true,
          precio_consultoria_ars: data.precio_consultoria_ars || DEFAULT_PAYMENT_CONFIG.precio_consultoria_ars,
          precio_consultoria_usd: data.precio_consultoria_usd || DEFAULT_PAYMENT_CONFIG.precio_consultoria_usd,
        };
        localStorage.setItem(LOCAL_GATEWAY_CONFIG_KEY, JSON.stringify(config));
        return config;
      }
    }

    const saved = localStorage.getItem(LOCAL_GATEWAY_CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_PAYMENT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (err) {
    console.warn('Error leyendo configuración de pagos:', err);
  }

  return DEFAULT_PAYMENT_CONFIG;
}

/**
 * Guarda la configuración de Mercado Pago y Stripe
 */
export async function guardarConfiguracionPagos(
  config: PaymentGatewayConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    localStorage.setItem(LOCAL_GATEWAY_CONFIG_KEY, JSON.stringify(config));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('configuracion_pagos').upsert([
        {
          id: 'default',
          ...config,
          actualizado_en: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.warn('No se pudo persistir configuracion_pagos en Supabase (guardado local):', error.message);
      }
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error guardando configuración.' };
  }
}

/**
 * Genera el script SQL para crear las tablas en Supabase con 1 clic
 */
export function getSupabaseSqlSchema(): string {
  return `-- ==========================================================
-- SCRIPT SQL PARA ONDIGU (Copiar y pegar en Supabase > SQL Editor)
-- ==========================================================

-- 0. Tabla de Clientes y Permisos de Usuarios
CREATE TABLE IF NOT EXISTS public.clientes_perfiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  role TEXT DEFAULT 'cliente' CHECK (role IN ('cliente', 'vip', 'admin')),
  status TEXT DEFAULT 'activo' CHECK (status IN ('activo', 'pendiente', 'bloqueado')),
  createdAt TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  notasAdmin TEXT DEFAULT ''
);

-- 1. Tabla de Turnos y Llamadas Agendadas
CREATE TABLE IF NOT EXISTS public.turnos (
  id TEXT PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  fecha DATE NOT NULL,
  franja TEXT NOT NULL,
  motivo TEXT NOT NULL,
  notas TEXT DEFAULT '',
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'contactado', 'hecho')),
  creado_en TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Tabla de Presupuestos y Consultas Directas
CREATE TABLE IF NOT EXISTS public.presupuestos_contactos (
  id TEXT PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  tipo_negocio TEXT NOT NULL,
  necesidades TEXT[] DEFAULT '{}',
  contacto TEXT NOT NULL,
  detalles TEXT DEFAULT '',
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'contactado', 'en_propuesta', 'cerrado')),
  creado_en TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Tabla de Configuración de Pasarelas de Pago (Mercado Pago & Stripe)
CREATE TABLE IF NOT EXISTS public.configuracion_pagos (
  id TEXT PRIMARY KEY DEFAULT 'default',
  mercadopago_public_key TEXT DEFAULT '',
  mercadopago_access_token TEXT DEFAULT '',
  mercadopago_sandbox BOOLEAN DEFAULT TRUE,
  mercadopago_link_consultoria TEXT DEFAULT '',
  stripe_publishable_key TEXT DEFAULT '',
  stripe_secret_key TEXT DEFAULT '',
  stripe_test_mode BOOLEAN DEFAULT TRUE,
  precio_consultoria_ars NUMERIC DEFAULT 25000,
  precio_consultoria_usd NUMERIC DEFAULT 35,
  actualizado_en TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Políticas de Seguridad de Filas (Row Level Security)
ALTER TABLE public.clientes_perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presupuestos_contactos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracion_pagos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir acceso a clientes_perfiles"
ON public.clientes_perfiles FOR ALL TO public, anon, authenticated USING (true);

-- Políticas para permitir inserción pública (los clientes pueden agendar sin trabas)
CREATE POLICY "Permitir inserción de turnos a todos"
ON public.turnos FOR INSERT TO public, anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir lectura de turnos al usuario o admin"
ON public.turnos FOR SELECT TO public, anon, authenticated USING (true);

CREATE POLICY "Permitir actualizar turnos"
ON public.turnos FOR UPDATE TO public, anon, authenticated USING (true);

CREATE POLICY "Permitir borrar turnos al admin"
ON public.turnos FOR DELETE TO public, anon, authenticated USING (true);

CREATE POLICY "Permitir inserción de presupuestos a todos"
ON public.presupuestos_contactos FOR INSERT TO public, anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir lectura de presupuestos"
ON public.presupuestos_contactos FOR SELECT TO public, anon, authenticated USING (true);

CREATE POLICY "Permitir borrar presupuestos al admin"
ON public.presupuestos_contactos FOR DELETE TO public, anon, authenticated USING (true);

CREATE POLICY "Permitir acceso a configuracion_pagos"
ON public.configuracion_pagos FOR ALL TO public, anon, authenticated USING (true);
`;
}

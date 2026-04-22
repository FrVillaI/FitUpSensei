import { create } from 'zustand';
import supabase from '../services/supabase';
import { AuthActions, AuthState, SignUpParams, UserRole } from '../types/auth.types';

function mapSupabaseError(message: string): string {
  if (message.includes('already registered') || message.includes('already exists')) {
    return 'Este correo ya tiene una cuenta registrada';
  }
  if (message.includes('Invalid login credentials')) {
    return 'Correo o contraseña incorrectos';
  }
  if (message.includes('Password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  if (message.includes('Email not confirmed')) {
    return 'Revisa tu correo y confirma tu cuenta';
  }
  return 'Ocurrió un error. Intenta de nuevo';
}

async function fetchRole(userId: string): Promise<UserRole | null> {
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  return (data?.role as UserRole) ?? null;
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  session: null,
  role: null,
  isLoading: true,

  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let role: UserRole | null = null;
    if (session?.user) {
      role = await fetchRole(session.user.id);
    }

    set({ session, user: session?.user ?? null, role, isLoading: false });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      let role: UserRole | null = null;
      if (session?.user) {
        role = await fetchRole(session.user.id);
      }
      set({ session, user: session?.user ?? null, role });
    });
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return mapSupabaseError(error.message);
    return null;
  },

  signUp: async ({ email, password, nombre, apellido, role }: SignUpParams) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, apellido, role },
      },
    });
    if (error) return mapSupabaseError(error.message);
    return null;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, role: null });
  },

  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },
}));

export default useAuthStore;

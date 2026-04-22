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

async function fetchProfile(userId: string): Promise<{ role: UserRole | null; avatarId: number | null }> {
  const { data } = await supabase
    .from('profiles')
    .select('role, avatar_id')
    .eq('id', userId)
    .single();
  return {
    role: (data?.role as UserRole) ?? null,
    avatarId: data?.avatar_id ?? null,
  };
}

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  session: null,
  role: null,
  avatarId: null,
  isLoading: true,

  initialize: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let role: UserRole | null = null;
    let avatarId: number | null = null;
    if (session?.user) {
      ({ role, avatarId } = await fetchProfile(session.user.id));
    }

    set({ session, user: session?.user ?? null, role, avatarId, isLoading: false });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      let role: UserRole | null = null;
      let avatarId: number | null = null;
      if (session?.user) {
        ({ role, avatarId } = await fetchProfile(session.user.id));
      }
      set({ session, user: session?.user ?? null, role, avatarId });
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

  setAvatarId: (id) => {
    set({ avatarId: id });
  },
}));

export default useAuthStore;

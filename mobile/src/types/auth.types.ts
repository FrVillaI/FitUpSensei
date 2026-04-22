import { Session, User } from '@supabase/supabase-js';

export type UserRole = 'coach' | 'client';

export interface SignUpParams {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  isLoading: boolean;
}

export interface AuthActions {
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (params: SignUpParams) => Promise<string | null>;
  signOut: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

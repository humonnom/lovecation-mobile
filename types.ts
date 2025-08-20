import { Tables, Database } from './supabase';

export type Profile = Tables<'profiles'>;

export type AuthUser = Database['auth']['Tables']['users']['Row'];

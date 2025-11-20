import { ComponentProps } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Tables, Database } from './supabase';

export type Profile = Tables<'profiles'>;

export type AuthUser = Database['auth']['Tables']['users']['Row'];

export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

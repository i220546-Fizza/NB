import { api } from './api';
import type { User } from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data;
  },
};

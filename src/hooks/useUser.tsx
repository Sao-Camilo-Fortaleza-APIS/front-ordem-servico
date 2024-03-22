import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as userSessionStorage from './user.sessionstore'
import api from '../services/api';

export interface User {
  accessToken: string;
  user: string
}

interface IUseUser {
  user: User | null;
}

async function getUser(user: User | null | undefined): Promise<User | null> {
  if (!user) return null;
  const response = await api.get(`/users/${user.user}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  })
  if (response.status !== 200) {
    return null
  }

  return await response.data;
}

export function useUser(): IUseUser {
  const { data: user } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async (): Promise<User | null> => getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userSessionStorage.getUser,
    /* onError: () => {
      //userSessionStorage.removeUser();
    } */
  });

  useEffect(() => {
    if (!user) userSessionStorage.removeUser();
    else userSessionStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  }
}
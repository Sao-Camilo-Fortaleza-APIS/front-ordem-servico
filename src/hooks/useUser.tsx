import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '../services/api';
import * as userCookies from './userCookies';

export interface User {
  token: string;
  user: string
}

interface IUseUser {
  user: User | null;
}

async function getUser(user: User | null | undefined): Promise<User | null> {
  if (!user) return null;
  const response = await api.get(`/get/orders/executor/${user.user}`, {
    headers: {
      Authorization: `Bearer ${user.token}`
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
    initialData: userCookies.getUser,
    /* onError: () => {
      //userSessionStorage.removeUser();
    } */
  });

  useEffect(() => {
    if (!user) userCookies.removeUser();
    else userCookies.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  }
}
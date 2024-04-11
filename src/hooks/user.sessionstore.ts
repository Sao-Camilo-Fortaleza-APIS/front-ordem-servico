import { User } from './useUser';

export const USER_SESSION_STORAGE_KEY = 'SESSION-USER';

export function saveUser(user: User): void {
  sessionStorage.setItem(USER_SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): User | undefined {
  const user = sessionStorage.getItem(USER_SESSION_STORAGE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  sessionStorage.removeItem(USER_SESSION_STORAGE_KEY);
}
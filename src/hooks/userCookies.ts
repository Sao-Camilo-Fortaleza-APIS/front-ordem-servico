import Cookies from 'js-cookie';
import { User } from './useUser';

export const USER_COOKIE_KEY = 'SESSION_USER_API';

export function saveUser(user: User): void {

  const cookieValue = JSON.stringify(user);
  Cookies.set(USER_COOKIE_KEY, cookieValue, {
    path: '/',
  });
}

export function getUser(): User | undefined {
  const user = Cookies.get(USER_COOKIE_KEY);
  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  Cookies.remove(USER_COOKIE_KEY);
}

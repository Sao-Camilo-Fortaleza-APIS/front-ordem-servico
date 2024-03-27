import { User } from './useUser';

export const USER_COOKIE_KEY = 'SESSION_USER_API';

export function saveUser(user: User, expirationDays: number = 1): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  const cookieValue = JSON.stringify(user);

  document.cookie = `${USER_COOKIE_KEY}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function getUser(): User | undefined {
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`${USER_COOKIE_KEY}=`));
  if (cookieValue) {
    return JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
  }
  return undefined;
}

export function removeUser(): void {
  document.cookie = `${USER_COOKIE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

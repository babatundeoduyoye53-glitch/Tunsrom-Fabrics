export const ADMIN_EMAIL = 'admin@tunsromfabrics.com';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_AUTH_STORAGE_KEY = 'isAdminLoggedIn';

export function isAdminAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true';
}

export function loginAdmin({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    throw new Error('Invalid admin email or password.');
  }

  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'true');
}

export function logoutAdmin() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
}

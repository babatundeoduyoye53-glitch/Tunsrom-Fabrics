const ADMIN_TOKEN_KEY = 'tunsrom-admin-token';

// POST /api/admin/auth/login
export async function loginAdmin({ email, password }) {
  const response = await fetch('/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Invalid admin credentials');

  localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
  return data;
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isAdminAuthenticated() {
  return !!localStorage.getItem(ADMIN_TOKEN_KEY);
}

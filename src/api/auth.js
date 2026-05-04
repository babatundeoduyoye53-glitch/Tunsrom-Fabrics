import { request } from './client';

const TOKEN_KEY = 'tunsrom-customer-token';
const USER_KEY = 'tunsrom-customer-user';

// POST /api/auth/register
export async function registerCustomer(payload) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

// POST /api/auth/login
export async function signInCustomer(payload) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

// GET /api/auth/me
export async function fetchCurrentUser() {
  return request('/auth/me');
}

// Sign out — clear local storage
export function signOutCustomer() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Check if customer is authenticated
export function isCustomerAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

// Get current customer from local storage (no API call)
export function getCurrentCustomerSession() {
  const stored = localStorage.getItem(USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

const CUSTOMER_USERS_STORAGE_KEY = 'tunsrom-customer-users';
const CUSTOMER_SESSION_STORAGE_KEY = 'tunsrom-customer-session';

function readUsers() {
  const stored = window.localStorage.getItem(CUSTOMER_USERS_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  window.localStorage.setItem(CUSTOMER_USERS_STORAGE_KEY, JSON.stringify(users));
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  };
}

export function initializeCustomerAuth() {
  if (typeof window === 'undefined') {
    return;
  }

  const users = readUsers();
  writeUsers(users);
}

export function isCustomerAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(CUSTOMER_SESSION_STORAGE_KEY) !== null;
}

export function getCurrentCustomerSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  const session = window.localStorage.getItem(CUSTOMER_SESSION_STORAGE_KEY);
  if (!session) {
    return null;
  }

  try {
    const parsed = JSON.parse(session);
    const users = readUsers();
    const matched = users.find((user) => user.id === parsed.userId);
    return matched ? sanitizeUser(matched) : null;
  } catch {
    return null;
  }
}

export function registerCustomer({ confirmPassword, email, name, password, phone }) {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error('Full name is required.');
  }

  if (!normalizedEmail) {
    throw new Error('Email is required.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.');
  }

  const users = readUsers();
  const exists = users.some((user) => user.email.toLowerCase() === normalizedEmail);

  if (exists) {
    throw new Error('An account with this email already exists.');
  }

  const nextUser = {
    id: `customer-${Date.now()}`,
    name: trimmedName,
    email: normalizedEmail,
    phone: phone.trim(),
    password,
  };

  const nextUsers = [...users, nextUser];
  writeUsers(nextUsers);
  window.localStorage.setItem(CUSTOMER_SESSION_STORAGE_KEY, JSON.stringify({ userId: nextUser.id }));
  return sanitizeUser(nextUser);
}

export function signInCustomer({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const matched = users.find((user) => user.email.toLowerCase() === normalizedEmail);

  if (!matched || matched.password !== password) {
    throw new Error('Invalid email or password.');
  }

  window.localStorage.setItem(CUSTOMER_SESSION_STORAGE_KEY, JSON.stringify({ userId: matched.id }));
  return sanitizeUser(matched);
}

export function signOutCustomer() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(CUSTOMER_SESSION_STORAGE_KEY);
}

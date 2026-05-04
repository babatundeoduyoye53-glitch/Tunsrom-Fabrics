import { adminRequest, request } from './client';

// GET /api/settings  (admin)
export function fetchSettings() {
  return adminRequest('/settings');
}

// GET /api/settings/public  (no auth needed)
export function fetchPublicSettings() {
  return request('/settings/public');
}

// PATCH /api/settings/store-info
export function saveStoreInfo(payload) {
  return adminRequest('/settings/store-info', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// PATCH /api/settings/whatsapp
export function saveWhatsAppConfig(payload) {
  return adminRequest('/settings/whatsapp', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// PATCH /api/settings/delivery
export function saveDeliveryZones(payload) {
  return adminRequest('/settings/delivery', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// PATCH /api/settings/social
export function saveSocialLinks(payload) {
  return adminRequest('/settings/social', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// PATCH /api/settings/admin-password
export function changeAdminPassword(payload) {
  return adminRequest('/settings/admin-password', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

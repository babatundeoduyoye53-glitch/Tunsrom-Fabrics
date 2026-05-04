import { request, adminRequest } from './client';

// POST /api/orders  — place an order
export async function placeOrder(payload) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// GET /api/orders/my  — logged-in customer's orders
export async function fetchMyOrders() {
  return request('/orders/my');
}

// GET /api/orders/track/:reference  — public tracking
export async function trackOrder(reference) {
  return request(`/orders/track/${reference}`);
}

// GET /api/orders  — admin: all orders
export async function fetchAllOrders({ page = 1, status } = {}) {
  const params = new URLSearchParams({ page });
  if (status) params.set('status', status);
  return adminRequest(`/orders?${params.toString()}`);
}

// PATCH /api/orders/:id/status  — admin: update status
export async function updateOrderStatus(id, status) {
  return adminRequest(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

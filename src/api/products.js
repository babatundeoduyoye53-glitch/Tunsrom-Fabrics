import { request, adminRequest } from './client';

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

// GET /api/products  — optional { category, search }
export async function fetchProducts({ category, search } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (search) params.set('search', search);

  const query = params.toString() ? `?${params.toString()}` : '';
  return request(`/products${query}`);
}

// GET /api/products/:id
export async function fetchProductById(id) {
  return request(`/products/${id}`);
}

// POST /api/products  (admin — supports file upload)
export async function createProduct(formData) {
  const token = localStorage.getItem('tunsrom-admin-token');
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create product');
  return data;
}

// PUT /api/products/:id  (admin — supports file upload)
export async function updateProduct(id, formData) {
  const token = localStorage.getItem('tunsrom-admin-token');
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update product');
  return data;
}

// DELETE /api/products/:id  (admin)
export async function deleteProduct(id) {
  return adminRequest(`/products/${id}`, { method: 'DELETE' });
}

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productsApi = {
  list: () => api.get('/products'),
  create: (payload) => api.post('/products', payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
}

export const customersApi = {
  list: () => api.get('/customers'),
  create: (payload) => api.post('/customers', payload),
  remove: (id) => api.delete(`/customers/${id}`),
}

export const ordersApi = {
  list: () => api.get('/orders'),
  create: (payload) => api.post('/orders', payload),
  remove: (id) => api.delete(`/orders/${id}`),
}

export const dashboardApi = {
  stats: () => api.get('/dashboard'),
}

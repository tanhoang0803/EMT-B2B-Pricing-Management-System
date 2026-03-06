import api from './api';

export const getOrders = () => api.get('/orders').then(r => r.data.data);
export const getOrder = (id) => api.get(`/orders/${id}`).then(r => r.data.data);
export const createOrder = (data) => api.post('/orders', data).then(r => r.data.data);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data).then(r => r.data.data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

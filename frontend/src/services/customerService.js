import api from './api';

export const getCustomers = () => api.get('/customers').then(r => r.data.data);
export const getCustomer = (id) => api.get(`/customers/${id}`).then(r => r.data.data);
export const createCustomer = (data) => api.post('/customers', data).then(r => r.data.data);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data).then(r => r.data.data);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

export const getGroups = () => api.get('/customers/groups').then(r => r.data.data);
export const createGroup = (data) => api.post('/customers/groups', data).then(r => r.data.data);

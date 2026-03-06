import api from './api';

export const getTemplates = () => api.get('/pricing/templates').then(r => r.data.data);
export const getTemplate = (id) => api.get(`/pricing/templates/${id}`).then(r => r.data.data);
export const createTemplate = (data) => api.post('/pricing/templates', data).then(r => r.data.data);
export const updateTemplate = (id, data) => api.put(`/pricing/templates/${id}`, data).then(r => r.data.data);
export const deleteTemplate = (id) => api.delete(`/pricing/templates/${id}`);

export const generatePricingTable = (data) => api.post('/pricing/generate', data).then(r => r.data.data);
export const getPricingEntries = (templateId) => api.get(`/pricing/entries/${templateId}`).then(r => r.data.data);
export const deletePricingEntry = (id) => api.delete(`/pricing/entries/${id}`);
export const getPriceTypes = () => api.get('/pricing/types').then(r => r.data.data);

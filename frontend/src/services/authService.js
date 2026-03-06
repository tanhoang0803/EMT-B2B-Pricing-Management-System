import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  const { token, user } = res.data.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const u = localStorage.getItem('user');
  return u ? JSON.parse(u) : null;
};

export const isAuthenticated = () => !!localStorage.getItem('token');

import axios from 'axios';
const authInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});
export const setToken = token => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchRegistration = async formData => {
  const { data } = await authInstance.post('/users/signup', formData);
  setToken(data.token);
  return data;
};

export const fetchLogin = async formData => {
  const { data } = await authInstance.post('/users/login', formData);
  setToken(data.token);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await authInstance.post('/users/logout');
  return data;
};

export const fetchRefresh = async () => {
  const { data } = await authInstance.get('/users/current');
  return data;
};

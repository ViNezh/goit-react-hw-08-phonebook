import axios from 'axios';
import { authInstance } from './authApi';
// const contactsInstance = axios.create({
//   baseURL: 'https://653a6d612e42fd0d54d3e0af.mockapi.io',
// });
export const getContacts = async () => {
  const { data } = await authInstance.get(`/contacts`);
  return data;
};
export const addContacts = async newContact => {
  const { data } = await authInstance.post(`/contacts`, newContact);
  return data;
};
export const deleteContacts = async contactId => {
  const { data } = await authInstance.delete(`/contacts/${contactId}`);
  return data;
};

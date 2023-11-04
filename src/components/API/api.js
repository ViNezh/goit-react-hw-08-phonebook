import { authInstance } from './authApi';

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

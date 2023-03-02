import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://63fdd2ad1626c165a0a090f5.mockapi.io/api/contacts',
});

export const fetchContacts = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const addContact = async data => {
  const { data: result } = await instance.post('/', data);
  return result;
};

export const deleteContact = async id => {
  const { data } = await instance.delete(`/${id}`);
  return data;
};

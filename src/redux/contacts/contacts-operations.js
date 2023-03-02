import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';
import * as api from '../../shared/services/contacts-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      return await api.fetchContacts();
    } catch ({ response }) {
      thunkApi.rejectWithValue(response.data);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkApi) => {
    try {
      const result = await api.addContact(newContact);
      return result;
    } catch ({ response }) {
      thunkApi.rejectWithValue(response.data);
    }
  },
  {
    condition: ({ name, number }, { getState }) => {
      const { contacts } = getState();
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();

      const result = contacts.items.some(({ name, number }) => {
        return (
          name.toLowerCase() === normalizedName ||
          number.toLowerCase() === normalizedNumber
        );
      });

      if (result) {
        Notify.warning(`Contact '${name}: ${number}' is already exist`);
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      await api.deleteContact(id);
      return id;
    } catch ({ response }) {
      thunkApi.rejectWithValue(response.data);
    }
  }
);

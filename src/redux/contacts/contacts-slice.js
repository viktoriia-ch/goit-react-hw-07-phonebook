import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContacts: {
      reducer: (state, { payload }) => {
        state.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },

    removeContact: (store, { payload }) =>
      store.filter(({ id }) => id !== payload),
  },
});

export const { addContacts, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;

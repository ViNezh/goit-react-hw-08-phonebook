import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, getContacts } from 'components/API/api';

export const fetchContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await getContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/Add',
  async (newContact, thunkAPI) => {
    try {
      const contact = await addContacts(newContact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (contactId, thunkAPI) => {
    try {
      const deleteContact = await deleteContacts(contactId);
      return deleteContact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const INITIAL_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const phoneBookSlice = createSlice({
  name: 'phonebook',
  initialState: INITIAL_STATE,
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      }),
});
export const { updateFilter } = phoneBookSlice.actions;

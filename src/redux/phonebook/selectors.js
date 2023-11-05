import { createSelector } from '@reduxjs/toolkit';

const selectContactsStore = state => state.phonebook;

export const selectContacts = createSelector(
  [selectContactsStore],
  phonebook => phonebook.contacts.items
);
export const selectContactsIsLoading = createSelector(
  [selectContactsStore],
  phonebook => phonebook.contacts.isLoading
);
export const selectContactsError = createSelector(
  [selectContactsStore],
  phonebook => phonebook.contacts.error
);
export const selectFilter = createSelector(
  [selectContactsStore],
  phonebook => phonebook.filter
);

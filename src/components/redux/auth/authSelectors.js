import { createSelector } from '@reduxjs/toolkit';

const selectAuth = state => state.authorisation;

export const selectAuthIsLoading = createSelector(
  [selectAuth],
  authorisation => authorisation.isLoading
);

export const selectAuthUser = createSelector(
  [selectAuth],
  authorisation => authorisation.user
);

export const selectAuthToken = createSelector(
  [selectAuth],
  authorisation => authorisation.token
);

export const selectAuthAuthentificated = createSelector(
  [selectAuth],
  authorisation => authorisation.authentificated
);

export const selectAuthError = createSelector(
  [selectAuth],
  authorisation => authorisation.error
);

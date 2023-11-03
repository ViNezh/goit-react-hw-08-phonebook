import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchLogin,
  fetchLogout,
  fetchRefresh,
  fetchRegistration,
  setToken,
} from 'components/API/authApi';

export const registerThunk = createAsyncThunk(
  'auth/registration',
  async (formData, thunkAPI) => {
    try {
      const authData = await fetchRegistration(formData);
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.messsage);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const loginData = await fetchLogin(formData);
      return loginData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.authorisation.token;
    try {
      setToken(token);
      const authData = await fetchRefresh();
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.authorisation.token;
      if (!token) {
        return false;
      }
      return true;
    },
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.authorisation.token;
    try {
      setToken(token);
      await fetchLogout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  authentificated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'Authorisation',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      // -----------------REGISTRATION---------------------
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      // -----------------LOGIN------------------------------
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      // -----------------REFRESH---------------------------
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.user = action.payload;
      })
      // ---------------LOGOUT-------------------------------
      .addCase(logOutThunk.fulfilled, () => {
        return INITIAL_STATE;
      })

      .addMatcher(
        isAnyOf(
          logOutThunk.pending,
          refreshThunk.pending,
          loginThunk.pending,
          registerThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          logOutThunk.rejected,
          refreshThunk.rejected,
          loginThunk.rejected,
          registerThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const authReducer = authSlice.reducer;

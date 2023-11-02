import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      .addCase(registerThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // -----------------LOGIN------------------------------

      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // -----------------REFRESH---------------------------
      .addCase(refreshThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.user = action.payload;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ---------------LOGOUT-------------------------------
      .addCase(logOutThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOutThunk.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.authentificated = false;
        state.isLoading = false;
      })
      .addCase(logOutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
export const authReducer = authSlice.reducer;

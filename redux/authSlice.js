import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', credentials);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://reqres.in/api/users/2', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://reqres.in/api/register', credentials);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data.token;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loadToken = createAsyncThunk('auth/loadToken', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async ({ id, name, job }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`https://reqres.in/api/users/${id}`, { name, job });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: null,
    updateSuccess: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null; // Clear any existing error messages
      AsyncStorage.removeItem('token');
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = action.payload;
        // Update the user details in the state
        if (state.user) {
          state.user.first_name = action.payload.name;
          state.user.job = action.payload.job;
        }
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearUpdateSuccess } = authSlice.actions;

export default authSlice.reducer;

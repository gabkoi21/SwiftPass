import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Screens/constants";

// Thunk for user login
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);

      // Log the response for debugging
      console.log("Login response:", response.data);

      // Destructure both access_token and refresh_token from the response
      const { access_token, refresh_token } = response.data;

      // Optionally, you can store both tokens in AsyncStorage for persistence
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);

      return { accessToken: access_token, refreshToken: refresh_token };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);

// Initial state
const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    restoreTokens: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticated = !!payload.accessToken;
    },

    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.isAuthenticated = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      });
  },
});

export const { restoreTokens, logout } = loginSlice.actions;
export default loginSlice.reducer;

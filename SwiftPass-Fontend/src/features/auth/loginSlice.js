import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../Screens/constants";

// Thunk for user login
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);

      const { userToken, userInfo } = response.data;

      return { userToken, userInfo };
    } catch (error) {
      // Detailed error logging
      // console.error("Login error:", error.response || error.message || error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);

// initial state
const initialState = {
  userToken: null,
  userInfo: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.userInfo;
        state.userToken = payload.userToken;
        state.success = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Screens/constants";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ fullname, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${BASE_URL}/api/register`,
        { fullname, email, password },
        config
      );

      return response.data; // Returning the response data if registration is successful
    } catch (error) {
      console.error("Error:", error); // Log the full error for debugging

      // Return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message); // Fallback for other e
      }
    }
  }
);

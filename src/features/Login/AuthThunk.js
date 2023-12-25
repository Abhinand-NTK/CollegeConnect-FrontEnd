import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/authservices";


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Make your API call here
      const response = await userService.login(credentials);
      return response;
      console.log(response)
    } catch (error) {
      // Reject the promise with the error message
      return rejectWithValue(error.message);
    }
  }
);
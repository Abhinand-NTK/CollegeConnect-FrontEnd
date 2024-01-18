import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services/authservices";


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Make your API call here
      const response = await userService.login(credentials);
      console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./AuthThunk";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    id: '',
    role: '',
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    setErrorMessage: (state, action) => {
      console.log("This is the state from the reducer :------", action.payload)
      state.error = action.payload;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.loading = false;
      state.user = null;
      localStorage.removeItem('Token');
      localStorage.removeItem('Token_R');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("The route is started feteching")
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("The rotue is full filled the action", action.payload)
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        if (action.payload == 401) {
          toast.error('When attempting to log in, please ensure that the entered username and password are correct. Additionally, if you find that your account is blocked, kindly reach out to support for further assistance.', {
            style: {
              fontSize: '16px',  // Set your desired font size
              maxWidth: '900px', // Set your desired maximum width
            },
          })
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("The rotue is rejected with some value", action.payload)
        state.loading = false;
        state.error = action.payload;
        // console.log("the Errror form slice",state.error)
        // toast.error('The')
      });
  },
});



export const { loginStart, loginSuccess, loginFailure, logout, setErrorMessage, clearErrorMessage } = authSlice.actions;
export default authSlice.reducer;
export const selectuser = ((state) => state.user.user)
export const loading = ((state) => state.user.loading)
export const is_logged = ((state) => state.user.isLoggedIn)

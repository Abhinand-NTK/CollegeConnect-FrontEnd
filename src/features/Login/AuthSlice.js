
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./AuthThunk";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role:'',
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
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
        console.log("The rotue is full filled the action")
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("The rotue is rejected with some value")
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectuser = ((state)=>state.user.user)
export const loading = ((state)=>state.user.loading)
export const is_logged = ((state)=>state.user.isLoggedIn)

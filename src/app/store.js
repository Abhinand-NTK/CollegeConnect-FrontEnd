import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/Login/AuthSlice'



export default configureStore({
  reducer: {
    user:authReducer,
  }
})  
import { useState } from 'react'
import Login from './features/Login/login'
import { Route, Routes } from 'react-router-dom'
import store from './app/store'
import { Provider } from 'react-redux'
import Register from './Components/Register/Register'
import Role from './Components/SelectRole/Role'
import RegisterCollege from './Components/Register/RegisterCollege'
import AdminLogin from './features/Login/AdminLogin'
import Menu from './Components/Menu/Menu'
import DashBoard from './Components/DashBoard/DashBorad'
import { AdminUsers } from './Components/AdminUsers/AdminUsers'
import UsersDashboard from './Components/ResusableComponets/UsersDashboard'
import UserProfileCard from './Components/ResusableComponets/UsersProfileCard'
import AddUserData from './Components/ResusableComponets/AddUserData'
import UsersDataList from './Components/ResusableComponets/UsersDataList'
import OtpVerification from './Components/OtpVerfication/OtpVerification'
import PrivateRoute from './Routes/PrivateRoute'
import CollegeAdminLandingPage from './Components/CollegeAdmin/CollegeAdminLandingPage'
import Intiate from './Components/Payment/Intiate'
Intiate

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Register />}></Route>
          <Route path='/role' element={<Role />}></Route>
          <Route path='/collegregister' element={<RegisterCollege />}></Route>
          <Route path='/admin' element={<AdminLogin />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/dashboard' element={<DashBoard />}></Route>
          <Route path='/users/dashboard' element={<UsersDashboard />}></Route>
          <Route path='/users/landing' element={<CollegeAdminLandingPage />}></Route>
          <Route path='/users/profilecard' element={<UserProfileCard />}></Route>
          <Route path='/users/addstudent' element={<AddUserData />}></Route>
          <Route path='/users/addteacher' element={<AddUserData />}></Route>
          <Route path='/users/usersdata' element={<UsersDataList />}></Route>
          <Route path='/users/otpverification' element={<OtpVerification />}></Route>
          <Route path='/users/checkout' element={<Intiate />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/admin/users' element={<AdminUsers />} />
          </Route>
        </Routes>
      </Provider>
    </>
  )
}

export default App

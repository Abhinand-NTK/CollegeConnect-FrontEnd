import { useState } from 'react'
import Login from './features/Login/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/signup' element={<Register/>}></Route>
            <Route path='/role' element={<Role/>}></Route>
            <Route path='/collegregister' element={<RegisterCollege/>}></Route>
            <Route path='/admin' element={<AdminLogin/>}></Route>
            <Route path='/menu' element={<Menu/>}></Route>
            <Route path='/dashboard' element={<DashBoard/>}></Route>
            <Route path='/admin/users' element={<AdminUsers/>}></Route>
            <Route path='/users/dashboard' element={<UsersDashboard/>}></Route>
            <Route path='/users/profilecard' element={<UserProfileCard/>}></Route>
            <Route path='/users/addstudent' element={<AddUserData/>}></Route>
            <Route path='/users/addteacher' element={<AddUserData/>}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App

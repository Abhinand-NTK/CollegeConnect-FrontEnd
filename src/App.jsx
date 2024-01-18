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
import Form from './Components/ReUsableForm/Form'
import LandingPage from './Components/LandingPage/LandingPage'
import CousreAdding from './Components/ReUsableForm/CourseAdding'
import AddStaff from './Components/ReUsableForm/AddStaff'
import AddStudnet from './Components/ReUsableForm/AddStudent'
import AddSubject from './Components/ReUsableForm/AddSubject'
import AddSession from './Components/ReUsableForm/AddSession'
import ClassRoom from './ClassRoom/ClassRoom'
import ClassRoomSpecs from './ClassRoom/ClassRoomSpecs'
import StaffStudentBasicInfo from './ClassRoom/StaffStudentBasicInfo'
import ClassRoomForTeachers from './ClassRoom/ClassRoomForTeachers'
import ClassRoomSpecsTeacher from './ClassRoom/ClassRoomSpecsTeacher'
import Subjects from './Subjects/Subjects'
import Modules from './Subjects/Modules'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/signin/' element={<Login />}></Route>
          <Route path='/signup' element={<Register />}></Route>
          <Route path='/role' element={<Role />}></Route>
          <Route path='/collegregister' element={<RegisterCollege />}></Route>
          <Route path='/admin' element={<AdminLogin />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/dashboard' element={<DashBoard />}></Route>
          <Route path='/manage' element={<UsersDashboard />}></Route>
          <Route path='/users/profilecard' element={<UserProfileCard />}></Route>
          <Route path='/users/profilecard/:id' element={<StaffStudentBasicInfo />}></Route>
          <Route path='/users/usersdata' element={<UsersDataList />}></Route>
          <Route path='/users/otpverification' element={<OtpVerification />}></Route>
          <Route path='/users/checkout' element={<Intiate />}></Route>
          <Route path='/users/admin/addcourse' element={<CousreAdding/>}></Route>
          <Route path='/users/admin/addstaff' element={<AddStaff/>}></Route>
          <Route path='/users/admin/addstudent' element={<AddStudnet/>}></Route>
          <Route path='/users/admin/addsubject' element={<AddSubject/>}></Route>
          <Route path='/users/admin/addsession' element={<AddSession/>}></Route>
          <Route path='/users/staff/subjects' element={<Subjects/>}></Route>
          <Route path='/users/staff/subjects/modules' element={<Modules/>}></Route>
          <Route path='/users/staff/classrooms' element={<ClassRoom/>}></Route>
          <Route path='/users/staffs/classrooms' element={<ClassRoomForTeachers/>}></Route>
          <Route path='/users/staff/classroomspecs/:id' element={<ClassRoomSpecs/>}></Route>
          <Route path='/users/staffs/attendence/:id_' element={<ClassRoomSpecsTeacher/>}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/admin/users' element={<AdminUsers />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/admin/landing' element={<CollegeAdminLandingPage />} />
          </Route>  
        </Routes>
      </Provider>
    </>
  )
}

export default App

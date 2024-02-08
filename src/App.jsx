import { useState } from 'react'
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
import Subjects from './Subjects/Subjects'
import Modules from './Subjects/Modules'
import Attendance from './ClassRoom/Attendance'
import ModulesVideoPlayer from './ClassRoom/ModulesVideoPlayer'
import BlogPost from './BlogPost/BlogPost'
import ChatComponent from './BlogPost/ChatComponet'
import LeaveRequestForm from './Components/LeaveReqeust/LeaveRequest'
import AttendanceTable from './ClassRoom/AttendanceTable'
import LeaveRequestApprovel from './Components/LeaveReqeust/LeaveRequestApprovel'
import PublicRoute from './Routes/PublicRoutes'
import NotFound from './Components/NotFoundPage/NotFound'
import ChangePasswordForm from './Components/ForgotPassword/ChangePasswordForm'
import { FcVideoCall } from "react-icons/fc";
import Login from "./features/Login/Login"





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Routes>
          {/* Public Routes in can access the commen users */}
          <Route path='/' element={<PublicRoute element={<LandingPage />} />} />
          <Route path='/signin/' element={<PublicRoute element={<Login />} />} />
          <Route path='/admin' element={<PublicRoute element={<AdminLogin />} />}></Route>
          <Route path='/signup' element={<PublicRoute element={<Register />} />}></Route>
          <Route path='/collegregister' element={<PublicRoute element={<RegisterCollege />} />} ></Route>

          {/* <Route path='/'>
            <PublicRoute element={LandingPage} />
          </Route> */}
          {/* <Route element={<PublicRoute />}>
            <Route path='/' element={<LandingPage />} />
          </Route> */}
          {/* <Route path='/' element={<LandingPage />}></Route> */}
          {/* <Route element={<PublicRoute />}>
            <Route path='/signin/' element={<Login />} />
          </Route> */}

          {/* <Route path='/signin/' element={<Login />}></Route> */}
          <Route path='/dashboard' element={<DashBoard />}></Route>
          {/* <Route path='/manage' element={<UsersDashboard />}></Route> */}
          {/* <Route path='/users/profilecard' element={<UserProfileCard />}></Route> */}
          {/* <Route path='/users/profilecard/:id' element={<StaffStudentBasicInfo />}></Route> */}
          {/* <Route path='/users/usersdata' element={<UsersDataList />}></Route> */}
          {/* <Route path='/users/otpverification' element={<OtpVerification />}></Route> */}
          {/* <Route path='/users/checkout' element={<Intiate />}></Route> */}
          <Route path='/resetpassword' element={<ChangePasswordForm />}></Route>


          <Route path='*' element={<NotFound />}></Route>

          <Route path='/role' element={<Role />}></Route>

          <Route path='/menu' element={<Menu />}></Route>
          {/* <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<DashBoard />} />
          </Route> */}
          <Route element={<PrivateRoute role={[1,2,3]} />}>
            <Route path='/manage' element={<UsersDashboard />} />
          </Route>
          <Route element={<PrivateRoute role={[2,3]} />}>
            <Route path='/users/profilecard' element={<UserProfileCard />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/profilecard/:id' element={<StaffStudentBasicInfo />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/usersdata' element={<UsersDataList />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[1]} />}>
            <Route path='/users/admin/addcourse' element={<CousreAdding />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[1]} />}>
            <Route path='/users/admin/addstaff' element={<AddStaff />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[1]} />}>
            <Route path='/users/admin/addstudent' element={<AddStudnet />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[1]} />}>
            <Route path='/users/admin/addsubject' element={<AddSubject />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[1]} />}>
            <Route path='/users/admin/addsession' element={<AddSession />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[2,3]} />}>
            <Route path='/users/subjects' element={<Subjects />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/staff/subjects/modules/:id__' element={<Modules />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/staff/subjects/modules/videoplayer/:id____/:M_no' element={<ModulesVideoPlayer />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[2]} hod={true} />}>
            <Route path='/users/staff/classrooms' element={<ClassRoom />}></Route>
          </Route>
          <Route element={<PrivateRoute  role={[2]} />}>
            <Route path='/users/staffs/classrooms' element={<ClassRoomForTeachers />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/staff/classroomspecs/:id' element={<ClassRoomSpecs />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/staffs/attendence/:id_' element={<Attendance />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[2,3]} />}>
            <Route path='/users/blogpost' element={<BlogPost />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/message' element={<ChatComponent />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[2,3]}/>}>
            <Route path='/users/leaverequest' element={<LeaveRequestForm />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[3]} />}>
            <Route path='/users/attendance' element={<AttendanceTable />}></Route>
          </Route>
          <Route element={<PrivateRoute role={[2]} hod={true} />}>
            <Route path='/users/leaverequestapprovel' element={<LeaveRequestApprovel />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/messages/:re' element={<ChatComponent />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/users/messages/' element={<ChatComponent />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/admin/users' element={<AdminUsers />} />
          </Route>
          <Route element={<PrivateRoute role={[1]} />}>
            <Route path='/admin/landing' element={<CollegeAdminLandingPage />} />
          </Route>

          {/* <Route path='/users/admin/addcourse' element={<CousreAdding />}></Route> */}
          {/* <Route path='/users/admin/addstaff' element={<AddStaff />}></Route> */}
          {/* <Route path='/users/admin/addstudent' element={<AddStudnet />}></Route> */}
          {/* <Route path='/users/admin/addsubject' element={<AddSubject />}></Route> */}
          {/* <Route path='/users/admin/addsession' element={<AddSession />}></Route> */}
          {/* <Route path='/users/subjects' element={<Subjects />}></Route> */}
          {/* <Route path='/users/staff/subjects/modules/:id__' element={<Modules />}></Route> */}
          {/* <Route path='/users/staff/subjects/modules/videoplayer/:id____/:M_no' element={<ModulesVideoPlayer />}></Route> */}
          {/* <Route path='/users/staff/classrooms' element={<ClassRoom />}></Route> */}
          {/* <Route path='/users/staffs/classrooms' element={<ClassRoomForTeachers />}></Route> */}
          {/* <Route path='/users/staff/classroomspecs/:id' element={<ClassRoomSpecs />}></Route> */}
          {/* <Route path='/users/staffs/attendence/:id_' element={<Attendance />}></Route> */}
          {/* <Route path='/users/blogpost' element={<BlogPost />}></Route> */}
          {/* <Route path='/users/message' element={<ChatComponent />}></Route> */}
          {/* <Route path='/users/leaverequest' element={<LeaveRequestForm />}></Route> */}
          {/* <Route path='/users/attendance' element={<AttendanceTable />}></Route> */}
          {/* <Route path='/users/leaverequestapprovel' element={<LeaveRequestApprovel />}></Route> */}
          {/* <Route path='/users/messages/:re' element={<ChatComponent />}></Route> */}
          {/* <Route path='/users/messages/' element={<ChatComponent />}></Route> */}

        </Routes>
      </Provider>
    </>
  )
}

export default App

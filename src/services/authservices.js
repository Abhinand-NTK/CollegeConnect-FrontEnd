import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { clearErrorMessage, setErrorMessage } from '../features/Login/AuthSlice';
// import { ErrorResponseImpl } from '@remix-run/router/dist/utils';

const BASE_URL = "http://localhost:8000/api/";



// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem('Token_R');
    const response = await axios.post(`${BASE_URL}token/refresh/`, { refresh: refresh_token });
    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh;
    localStorage.setItem('Token', newAccessToken);
    localStorage.setItem('Token_R', newRefreshToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Axios instance with interceptors for handling authentication
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  const storedToken = localStorage.getItem('Token');
  if (storedToken) {
    const decodedToken = jwtDecode(storedToken);
    const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
    const currentTime = new Date().getTime();

    // If the access token is expired or will expire in the next 60 seconds, refresh it
    if (currentTime > expirationTime - 4 * 60 * 1000) {
      try {
        const newAccessToken = await refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Error refreshing access token:', error);
        // Handle the error (e.g., log the user out)
      }
    } else {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
  }

  return config;
});

// Written service for different actions
export const userService = {
  login: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}token/`, userData);
      const token = response.data.access;
      localStorage.setItem('Token', response.data.access);
      localStorage.setItem('Token_R', response.data.refresh);
      console.log(decodedToken, "This is the info frm token---");
      console.log(response.status);
      return response
    } catch (error) {
      console.error("Error is:---", error.response.status);
      return error.response.status
    }
  },
  getuserdata: async () => {
    try {
      const storedToken = localStorage.getItem('Token');
      let id;
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        id = decodedToken.user_id;
        console.log(decodedToken, "This is the info frm token---");

      }

      const response = await axios.get(`${BASE_URL}superadmin/active_user/${id}/`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("This is the user details from the backend", response);
    } catch (error) {
      console.error(error);

      // Handle 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();

          // Retry the original request with the new access token
          const retryResponse = await axios.get(`${BASE_URL}superadmin/active_user/${id}/`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
          });

          console.log("This is the user details after token refresh", retryResponse);
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          // Handle the error (e.g., log the user out)
        }
      }
    }
  },
  getcollegedata: async () => {
    try {
      const storedToken = localStorage.getItem('Token');
      const response = await axios.get(`${BASE_URL}superadmin/colleges_deatils/`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data

    } catch (error) {
      console.error(error);

      // Handle 401 Unauthorized error
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();

          // Retry the original request with the new access token
          const retryResponse = await axios.get(`${BASE_URL}superadmin/active_user/${id}/`, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
          });

          console.log("This is the user details after token refresh", retryResponse);
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
        }
      }
    }
  },
  sendEmailForConfirmation: async (id) => {
    try {
      const storedToken = localStorage.getItem('Token');
      const response = await axios.post(`${BASE_URL}superadmin/activation_mail/`, { id },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  registerCollege: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}superadmin/register/`, formData);
      return response
    }
    catch (error) {
      console.log(error)
    }
  },
  blockCollege: async (id) => {
    try {
      const storedToken = localStorage.getItem('Token');
      const response = await axios.patch(
        `${BASE_URL}superadmin/register_update/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  gettingIdOfUser: () => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    return data_user.user_id;
  }

};


export const CollgeAdminServices = {


  AddCourse: async (formData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}collegeadmin/addcourse/`, formData);
      return response; // Return the data if needed
    } catch (error) {
      console.error('Error adding course:', error);
      throw error; // Throw the error for the calling function to handle
    }
  }
  ,
  GetCourse: async () => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.get(`${BASE_URL}collegeadmin/getallcourse/?id=${data_user.user_id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  editCourse: async (formData) => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}collegeadmin/editcourse/${data_user.user_id}/`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  AddStaff: async (formData) => {

    try {
      const response = await axiosInstance.post(`${BASE_URL}collegeadmin/addstaff/`, formData);
      return response
    } catch (error) {
      console.log(error)
    }
  },
  getStaffDetails: async () => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.get(`${BASE_URL}collegeadmin/getallstaff/?id=${data_user.user_id}`)
      return response.data
    }
    catch (error) {
      console.log(error)
    }
  },
  editStaff: async (formData) => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}collegeadmin/editstaffdetails/${data_user.user_id}/`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }

  },
  blockStaff: async (id) => {
    try {
      const response = await axiosInstance.patch(`${BASE_URL}collegeadmin/blockuser/${id}/`, {});
      return response
    } catch (error) {
      console.log(error)

    }
  },
  addSubject: async (formData) => {
    console.log("This is the details to send to the staff creation", formData)

    try {
      const response = await axiosInstance.post(`${BASE_URL}collegeadmin/addsubject/`, formData)
      return response
    }
    catch (error) {
      console.log(error)
    }
  },
  editSubject: async (formData) => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);

    console.log(formData)
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}collegeadmin/editsubject/${data_user.user_id}/`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }

  },
  getSubject: async () => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.get(`${BASE_URL}collegeadmin/listsubject/?id=${data_user.user_id}`)
      return response.data
    }
    catch (error) {
      console.log(error)
    }
  },
  addSession: async (formData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}collegeadmin/addsession/`, formData)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  getSession: async () => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.get(`${BASE_URL}collegeadmin/getsession/?id=${data_user.user_id}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  editSession: async (formData) => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.patch(`${BASE_URL}collegeadmin/editsession/${data_user.user_id}/`, formData)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  addStudent: async (formData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}collegeadmin/addstudent/`, formData)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  editStudent: async (formData) => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.put(`${BASE_URL}collegeadmin/editstudent/${data_user.user_id}/`, formData)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  getStudent: async () => {
    const token = localStorage.getItem('Token');
    const data_user = jwtDecode(token);
    try {
      const response = await axiosInstance.get(`${BASE_URL}collegeadmin/getstudent/?id=${data_user.user_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  createUser: async (formData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}collegeadmin/createAccounforuser/`, formData)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export const StaffUserServices = {

  getCousers: async () => {
    try {
      const token = localStorage.getItem('Token');
      const data_user = jwtDecode(token);
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getCourses/?id=${data_user.user_id}`)
      return response.data

    } catch (error) {
      console.log(error)
    }
  },
  getStudents: async (formData) => {
    try {
      const token = localStorage.getItem('Token');
      const data_user = jwtDecode(token);
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getstudents/?id=${data_user.user_id}&course=${formData['course']}&semseter=${formData['semseter']}`);
      return response;
    } catch (error) {
      console.error("Error in getStudents:", error.message || error);
      throw error;
    }
  },
  createClassRoom: async (formData) => {
    try {
      const token = localStorage.getItem('Token');
      const data_user = jwtDecode(token);
      const response = await axiosInstance.post(`${BASE_URL}staffuser/createclassroom/?id=${data_user.user_id}`, formData)
      return response

    } catch (error) {
      console.log(error)
    }
  },
  GetClassRooms: async () => {
    try {
      const token = localStorage.getItem('Token');
      const data_user = jwtDecode(token);
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getclassrooms/?id=${data_user.user_id}`)
      return response.data
    } catch (error) {

    }
  },
  GetClassRoom: async (id) => {
    try {
      const token = localStorage.getItem('Token');
      const data_user = jwtDecode(token);
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getclassroom?id=${data_user.user_id}&c_id=${id}`)
      return response.data
    } catch (error) {

    }
  },
  UserDetails: async () => {
    try {
      const token = localStorage.getItem('Token')
      const data_user = jwtDecode(token)
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getprofile/${data_user.user_id}/`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  EditUserDetails: async (formdata) => {
    const token = localStorage.getItem('Token')
    const data_user = jwtDecode(token)
    try {
      const response = await axiosInstance.patch(`${BASE_URL}staffuser/getprofile/${data_user.user_id}/`, formdata)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  ,
  getTeacherDetails: async (id) => {
    try {

      const response = await axiosInstance.get(`${BASE_URL}collegeadmin/getallstaff/${id}/`)
      return response.data

    } catch (error) {
      console.log(error)
    }
  },
  GetClassRoomsForTeacher: async (sub_ids, id) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getpro/`, {
        params: {
          sub_ids: sub_ids.join(','),
          id: id,
        },
      });

      console.log("This is the response", response)

      return response.data;
    } catch (error) {
      console.error(error);
      console.log(error)
      throw error;
    }
  }
  ,
  AssignTeacherToClassRoom: async (formData, id) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}staffuser/classforteacher/?id=${id}`, formData)
      return response

    } catch (error) {
      setErrorMessage(error.response.data.error[0])
      console.log(error)
      return error
    }
  },
  GetAssignedTeachers: async (sub_ids) => {

    try {
      const response = await axiosInstance.get(`${BASE_URL}staffuser/classforteacher/`, {
        params: {
          sub_ids: sub_ids.join(','),
        },
      });
      console.log("This is the response", response)
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  DeleleAssignedClassroomForTeacher: async (id) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}staffuser/classforteacher/${id}/`)
      return response
    } catch (error) {

    }
  },
  GetClassroomsForTeachers: async (id) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}staffuser/classroomsforteachers/${id}/`)
      return response.data
    } catch (error) {

    }
  },

  MarkAttendence: async (formdata) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}staffuser/classroomattendence/`, formdata)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  GetAttendenceOfStudents: async (classRoomId, date) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}staffuser/getclassroomattendence/`, {
        params: {
          class_room_for_staff_id: classRoomId,
          date: date,
        }
      });
      return response.data
      // Process the response here
    } catch (error) {
      console.log(error)
    }
  },
  CreateModulesForClassRoom: async (formdata) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}staffuser/createmodulesforclassrooms/`, formdata)
      return response

    } catch (error) {
      console.log(error)
    }
  },
  GetTheModulesofclassroom: async (class_room_staff_id) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}staffuser/createmodulesforclassrooms/?class_room_staff_id=${class_room_staff_id}`)
      return response.data

    } catch (error) {

    }
  },
  DeleteModule: async (item_id) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}staffuser/createmodulesforclassrooms/${item_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  UpdateModuleClassroom: async (M_no, formdata) => {
    try {
      const response = await axiosInstance.patch(`${BASE_URL}staffuser/createmodulesforclassrooms/${M_no}/`, formdata)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  GetModuleVideo: async (M_no) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}staffuser/createmodulesforclassrooms/${M_no}/`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

}


export const StudentUserServices = {


  GetSubjectsStudents: async () => {
    const token = localStorage.getItem('Token')
    const data_user = jwtDecode(token)
    try {
      const response = axiosInstance.get(`${BASE_URL}studentuser/getsubejcts/${data_user.user_id}/`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  GetMedia: async (class_room_staff_id, sub_id) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}studentuser/media/?class_room_staff_id=${class_room_staff_id}&sub_id=${sub_id}`);
      // const response = await axiosInstance.get(`${BASE_URL}studentuser/media/?class_room_staff_id=${class_room_staff_id}/?sub_id=${sub_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  GetAttendence: async () => {
    const token = localStorage.getItem('Token')
    const data_user = jwtDecode(token)
    try {
      const response = await axiosInstance.get(`${BASE_URL}studentuser/studentattendence/${data_user.user_id}`)
      return response.data
    } catch (error) {

    }
  },
  RequestingForLeave: async (formdata) => {

    console.log("This is the data that is coming form the jsx ::----",formdata)
    try {
      const response = await axiosInstance.post(`${BASE_URL}studentuser/requestforleave/`, formdata)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  GetReqeustStatus: async (id) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}studentuser/requestforleave/${id}/`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  GetReqeustStatusUsers: async () => {
    const token = localStorage.getItem('Token')
    const data_user = jwtDecode(token)
    try {
      const response = await axiosInstance.get(`${BASE_URL}studentuser/requestforleave/?id=${data_user.user_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  },
  ApprovalLeave : async (id) => {
    const token = localStorage.getItem('Token')
    const data_user = jwtDecode(token)
    
    try {
      const response = await axiosInstance.patch(`${BASE_URL}studentuser/requestforleave/${id}/?id=${data_user.user_id}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }

}

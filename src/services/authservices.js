import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
    } catch (error) {
      console.error("Error is:", error.response.status);
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
      const response = await axiosInstance.post(`${BASE_URL}staffuser/createclassroom/?id=${data_user.user_id}`,formData)
      return response

    } catch (error) {
      console.log(error)
    }
  }
}
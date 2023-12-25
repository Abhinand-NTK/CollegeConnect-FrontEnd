// // import { jwtDecode } from 'jwt-decode';
// // import axios from 'axios';

// // //Base url for all reuests

// // const BASE_URL = "http://localhost:8000/api/";


// // // in the below axios insatace created for sending reqeuest 
// // //to the backend where the authentication required using the token

// // const axiosInstance = axios.create();
// // axiosInstance.interceptors.request.use((config) => {

// //   if (storedToken) {
// //     config.headers.Authorization = `Bearer ${storedToken}`;
// //   }
// //   return config; // Make sure to return the config object
// // });


// // //Getting the token stored  in the local storage

// // const storedToken = localStorage.getItem('Token');

// // //Written serivce for diffrent actions

// // export const userService = {
// //   login: async (userData) => {
// //     //Can use for login the user using the credinitals 
// //     try {
// //       const response = await axios.post(`${BASE_URL}token/`, userData);
// //       console.log(response.data.access)
// //       const token = response.data.access;
// //       localStorage.setItem('Token', response.data.access);
// //       localStorage.setItem('Token_R', response.data.refresh);
// //       console.log(decodedToken)

// //       console.log(response.status)
// //     } catch (error) {
// //       console.error("Error is:", error.response.status);
// //     }
// //   },
// //   getuserdata: async () => {
// //     //Can use for getting the indivudal details of the user if required
// //     let id;
// //     if (storedToken) {
// //       const decodedToken = jwtDecode(storedToken);
// //       id = decodedToken.user_id
// //     }
// //     try {

// //       const response = await axios.get(`http://127.0.0.1:8000/api/superadmin/active_user/${id}/`, {
// //             headers: {
// //               Authorization: `Bearer ${storedToken}`,
// //               'Content-Type': 'application/json',
// //             },
// //           });


// //       // const response = await axiosInstance.get(`${BASE_URL}superadmin/active_user/${id}/`, {
// //       //   headers: {
// //       //     'Content-Type': 'application/json',
// //       //   },
// //       // });
// //       console.log("this is the user details from the backend", response)
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }





// // }




// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const BASE_URL = "http://localhost:8000/api/";

// // Function to refresh the access token
// const refreshAccessToken = async () => {
//   try {
//     const refresh_token = localStorage.getItem('Token_R');
//     const response = await axios.post(`${BASE_URL}token/refresh/`, { refresh: refresh_token });
//     const newAccessToken = response.data.access;
//     const newRefreshToken = response.data.refresh;
//     localStorage.setItem('Token', newAccessToken);
//     localStorage.setItem('Token_R', newRefreshToken);
//     return newAccessToken;
//   } catch (error) {
//     console.error('Error refreshing access token:', error);
//     throw error;
//   }
// };

// // Axios instance with interceptors for handling authentication
// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(async (config) => {
//   const storedToken = localStorage.getItem('Token');
//   if (storedToken) {
//     const decodedToken = jwtDecode(storedToken);
//     const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
//     const currentTime = new Date().getTime();

//     // If the access token is expired or will expire in the next 60 seconds, refresh it
//     if (currentTime > expirationTime - 4 *  60 * 1000) {
//       try {
//         const newAccessToken = await refreshAccessToken();
//         config.headers.Authorization = `Bearer ${newAccessToken}`;
//       } catch (error) {
//         console.error('Error refreshing access token:', error);
//         // Handle the error (e.g., log the user out)
//       }
//     } else {
//       config.headers.Authorization = `Bearer ${storedToken}`;
//     }
//   }

//   return config;
// });

// // Written service for different actions
// export const userService = {
//   login: async (userData) => {
//     try {
//       const response = await axios.post(`${BASE_URL}token/`, userData);
//       const token = response.data.access;
//       localStorage.setItem('Token', response.data.access);
//       localStorage.setItem('Token_R', response.data.refresh);
//       console.log(decodedToken)
//       console.log(response.status)
//     } catch (error) {
//       console.error("Error is:", error.response.status);
//     }
//   },
//   getuserdata: async () => {
//     try {
//       const storedToken = localStorage.getItem('Token');
//       let id;
//       if (storedToken) {
//         const decodedToken = jwtDecode(storedToken);
//         id = decodedToken.user_id;
//       }

//       const response = await axios.get(`${BASE_URL}superadmin/active_user/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log("This is the user details from the backend", response);
//     } catch (error) {
//       if (error.response && error.response.status === 401){

//         try {
//           const newAccessToken = await refreshAccessToken();
//           config.headers.Authorization = `Bearer ${newAccessToken}`;
//         } catch (error) {
//           console.error('Error refreshing access token:', error);
//           // Handle the error (e.g., log the user out)
//         }
  

//       }
//     }
//   },
// };


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
      console.log(decodedToken,"This is the info frm token---");
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
        console.log(decodedToken,"This is the info frm token---");
        
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
};

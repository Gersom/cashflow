import axios from 'axios';

console.log('ENV:', import.meta.env.VITE_ENV);
console.log('DEV BACK URL:', import.meta.env.VITE_DEV_BACKEND_URL);
console.log('PROD BACK URL:', import.meta.env.VITE_PROD_BACKEND_URL);

console.log('authURL:', 
    `${import.meta.env.VITE_ENV === 'production' 
      ? import.meta.env.VITE_PROD_BACKEND_URL 
      : import.meta.env.VITE_DEV_BACKEND_URL}/api/auth`
  );
  
  console.log('commonURL:', 
    `${import.meta.env.VITE_ENV === 'production' 
      ? import.meta.env.VITE_PROD_BACKEND_URL 
      : import.meta.env.VITE_DEV_BACKEND_URL}/api/common`
  );
  
const axiosApiConfig = {
  baseURL:     `${import.meta.env.VITE_ENV === 'production' 
    ? import.meta.env.VITE_PROD_BACKEND_URL 
    : import.meta.env.VITE_DEV_BACKEND_URL}/api/common`,
  withCredentials: true,
};

const axiosAuthConfig = {
  baseURL: `${import.meta.env.VITE_ENV === 'production' 
    ? import.meta.env.VITE_PROD_BACKEND_URL 
    : import.meta.env.VITE_DEV_BACKEND_URL}/api/auth`,
  withCredentials: true,
};

const axiosApi = axios.create(axiosApiConfig);
const axiosAuth = axios.create(axiosAuthConfig);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosApi(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosAuth.post('/token/refresh');
        
        // No necesitamos almacenar el token manualmente, la cookie se establecerá automáticamente
        
        processQueue(null, data.access_token);
        return axiosApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        // Si el refresco falla, redirigir al login o manejar según sea necesario
        // window.location = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export { axiosApi, axiosAuth };
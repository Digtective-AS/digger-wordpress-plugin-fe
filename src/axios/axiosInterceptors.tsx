import {authFetch, dataFetch, dataFetchDigger, onlineDataFetch} from './customAxios';
import closableEnqueueSnackbar from '../components/closableEnqueueSnackbar/closableEnqueueSnackbar';
import {useAuthStore} from '../store/authStore';
import {AxiosError} from "axios";

const handleErrorResponse = (error: AxiosError, logout: () => void) => {
  console.log(error);
  if (error?.response?.status === 401) {
    logout();
    closableEnqueueSnackbar('Your session has expired', 'error');
  }
  return Promise.reject(error);
};

const axiosInterceptor = () => {
  const { logout } = useAuthStore();

  authFetch.interceptors.response.use(
    (response) => response,
    (error) => handleErrorResponse(error, logout)
  );

  dataFetch.interceptors.response.use(
    (response) => response,
    (error) => handleErrorResponse(error, logout)
  );

  dataFetchDigger.interceptors.response.use(
    (response) => response,
    (error) => handleErrorResponse(error, logout)
  );

  onlineDataFetch.interceptors.response.use(
    (response) => response,
    (error) => handleErrorResponse(error, logout)
  );
};

export default axiosInterceptor;

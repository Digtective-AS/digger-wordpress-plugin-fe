import {authFetch, dataFetchDigger} from './customAxios';
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

  authFetch.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.set("X-WP-Nonce", wpNonce);

    return config;
  });

  authFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        closableEnqueueSnackbar('You are not an admin', 'error');
      }

      return Promise.reject(error);
    }
  );

  dataFetchDigger.interceptors.response.use(
    (response) => response,
    (error) => handleErrorResponse(error, logout)
  );
};

export default axiosInterceptor;

import { useTranslation } from 'react-i18next';
import { dataFetch } from './customAxios';
import closableEnqueueSnackbar from '../components/closableEnqueueSnackbar/closableEnqueueSnackbar';
import { useAuthStore } from '../store/authStore';

const axiosInterceptor = () => {
  const { logout } = useAuthStore();

  dataFetch.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
      if (error?.response?.status === 401) {
        logout();
        closableEnqueueSnackbar("Your session has expired", 'error');
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInterceptor;

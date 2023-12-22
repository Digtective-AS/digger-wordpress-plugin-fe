import closableEnqueueSnackbar from '../../components/closableEnqueueSnackbar/closableEnqueueSnackbar';
import { ApiError } from '../../interfaces/apiResponse.type';

export const handleApiError = (err: ApiError<null>) => {
  const errorMessage = err?.response?.data?.status?.message;

  if (Array.isArray(errorMessage)) {
    errorMessage.forEach((message: string) => {
      closableEnqueueSnackbar(message, 'error');
    });
  } else if (typeof errorMessage === 'string') {
    closableEnqueueSnackbar(errorMessage, 'error');
  } else {
    closableEnqueueSnackbar('Something went wrong!', 'error');
  }
};

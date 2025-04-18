import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import {authFetch} from '../../axios/customAxios';
import {ApiError} from '../../interfaces/apiResponse.type';
import {useAuthStore} from "../../store/authStore.tsx";

const useGetToken = (
  identifier: string,
  isLoggedIn: boolean,
  onSuccessRetrievedToken?: (_fetchedToken: string) => void,
) => {
  const logout = useAuthStore((state) => state.logout);
  return useQuery<AxiosResponse, ApiError<null>>(
    [`currentUser_${identifier}_${isLoggedIn}`],
    () => authFetch.get('/wp-json/digtective/v1/get-token'),
    {
      onSuccess: (res) => {
        if (res?.data !== "") {
          onSuccessRetrievedToken?.(res.data);
        }
      },
    },
  );
}

export default useGetToken;

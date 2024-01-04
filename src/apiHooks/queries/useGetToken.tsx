
import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import {authFetch, dataFetch} from '../../axios/customAxios';
import {OrganizationSettingsInterface} from '../../interfaces/organizationSettings.interface';
import {ApiError, ApiResponse} from '../../interfaces/apiResponse.type';

const useGetToken = (
  identifier: string,
  onSuccessRetrievedToken?: (_fetchedToken: string) => void,
) => useQuery<AxiosResponse, ApiError<null>>(
  [`currentUser_${identifier}`],
  () => authFetch.get('/wp-json/digtective/v1/get-token'),
  {
    onSuccess: (res) => {
      onSuccessRetrievedToken?.(res.data);
    },
  },
);

export default useGetToken;

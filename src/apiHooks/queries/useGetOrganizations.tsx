import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import {dataFetch} from '../../axios/customAxios';
import {OrganizationSettingsInterface} from '../../interfaces/organizationSettings.interface';
import {ApiError, ApiResponse} from '../../interfaces/apiResponse.type';

const useGetOrganizationSettings = (
    identifier: string,
    onSuccessRetrieved?: (_organizationSettings: OrganizationSettingsInterface) => void,
) => useQuery<AxiosResponse, ApiError<null>, ApiResponse<OrganizationSettingsInterface>>(
    [`currentUser_${identifier}`],
    () => dataFetch.get('organization-settings'),
    {
        onSuccess: (res) => {
            onSuccessRetrieved?.(res?.data?.data);
        },
    },
);

export default useGetOrganizationSettings;

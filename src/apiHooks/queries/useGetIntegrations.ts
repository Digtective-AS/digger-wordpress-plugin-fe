import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {AxiosResponse} from 'axios/index';
import {dataFetchCore} from '../../axios/customAxios';
import {appendQueryParamIfNotEmpty, generateQueryKey} from '../../constants/hookConstants';
import {ApiError, ApiResponse} from '../../interfaces/apiResponse.type';

export const useGetIntegrations = (
    identifier: string,
) => {
    const queryParams = new URLSearchParams();

    const queryKey = generateQueryKey(identifier, queryParams);

    return useQuery<AxiosResponse, ApiError<null>, ApiResponse<any>>(
        [`integrations_name_${queryKey}`],
        () => dataFetchCore.get(`organization-settings/integrations`),
    );
};
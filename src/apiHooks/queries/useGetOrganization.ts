import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {AxiosResponse} from 'axios/index';
import {dataFetchDigger} from '../../axios/customAxios';
import {appendQueryParamIfNotEmpty, generateQueryKey} from '../../constants/hookConstants';
import {ApiError, ApiResponse} from '../../interfaces/apiResponse.type';

export const useGetOrganizationName = (
    identifier: string,
) => {
    const queryParams = new URLSearchParams();
    const navigate = useNavigate();

    const queryKey = generateQueryKey(identifier, queryParams);

    return useQuery<AxiosResponse, ApiError<null>, ApiResponse<any>>(
        [`organization_name_${queryKey}`],
        () => dataFetchDigger.get(`organization-settings`),
        {
            onSuccess : (response) => {
                if(response?.data?.data.organizationType != null) {
                    navigate('/wp-admin/admin.php/integrations/woocommerce')
                }
            }
        }
    );
};
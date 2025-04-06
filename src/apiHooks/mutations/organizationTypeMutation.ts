import {useAuthStore} from "../../store/authStore.tsx";
import {useMutation} from "react-query";
import {AxiosResponse} from "axios";
import {ApiError} from "../../interfaces/apiResponse.type.ts";
import {AuthRequest, AuthResponse} from "../../types/api/auth.ts";
import {authFetch, dataFetchDigger} from "../../axios/customAxios.ts";
import {handleApiError} from "../requestHelpers/requestHelpers.tsx";
import closableEnqueueSnackbar from "../../components/closableEnqueueSnackbar/closableEnqueueSnackbar.tsx";

const useChangeOrganization = () => {

    return useMutation(
        (postRequest: string) => dataFetchDigger.patch(
            'organization-settings',
            {
                organizationType: postRequest,
            },
        ),
        {
            onSuccess: () => {
                closableEnqueueSnackbar('Successfully selected Organization Type', 'success');
            },
            onError: (err) => {
                handleApiError(err);
            },

        },
    );
};

export default useChangeOrganization;

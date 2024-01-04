import {useAuthStore} from "../../store/authStore.tsx";
import {useMutation} from "react-query";
import {AxiosResponse} from "axios";
import {ApiError} from "../../interfaces/apiResponse.type.ts";
import {AuthRequest, AuthResponse} from "../../types/api/auth.ts";
import {authFetch} from "../../axios/customAxios.ts";
import {handleApiError} from "../requestHelpers/requestHelpers.tsx";
import closableEnqueueSnackbar from "../../components/closableEnqueueSnackbar/closableEnqueueSnackbar.tsx";

const useMutateLogin = () => {
    const {login} = useAuthStore();

    return useMutation<AxiosResponse<AuthResponse>, ApiError<null>, AuthRequest>(
        (postRequest) => authFetch.post<AuthResponse, AxiosResponse<AuthResponse>, AuthRequest>(
            '/wp-json/digtective/v1/connection',
            {
                token: postRequest.token,
            },
        ),
        {
            onSuccess: ({data: authResponse}, postRequestData) => {
                if (authResponse.data) {
                    login(postRequestData.token);
                } else {
                    closableEnqueueSnackbar('Invalid token', 'error');
                }
            },
            onError: (err) => {
                handleApiError(err);
            },

        },
    );
};

export default useMutateLogin;
import {useAuthStore} from "../../store/authStore.tsx";
import {useMutation} from "react-query";
import {AxiosResponse} from "axios";
import {ApiError} from "../../interfaces/apiResponse.type.ts";
import {AuthRequest, AuthResponse} from "../../types/api/auth.ts";
import {authFetch} from "../../axios/customAxios.ts";
import {handleApiError} from "../requestHelpers/requestHelpers.tsx";

const useMutateLogin = () => {
    const {login} = useAuthStore();

    return useMutation<AxiosResponse<AuthResponse>, ApiError<null>, AuthRequest>(
        (postRequest) => authFetch.post<AuthResponse, AxiosResponse<AuthResponse>, AuthRequest>(
            'wp-json/digtective/v1/connection',
            {
                token: postRequest.token,
            },
        ),
        {
            onSuccess: ({data: authResponse}) => {
                if (!authResponse.data) {
                    // TODO add a middleware that checks AuthResponse.data !== undefined for all API successful responses
                    throw new Error('Missing data!');
                }

                login(authResponse.data.authorization.token);
            },
            onError: (err) => {
                handleApiError(err);
            },
        },
    );
};

export default useMutateLogin;
import { AxiosResponse } from 'axios';

interface DiggerStatusResponse {
    code: number;
    message: string | string[];
    error: string;
}

interface DiggerResponse<T> {
    data: T;
    status: DiggerStatusResponse;
    // TODO: Coordinate with backend and remove response: object
    response: DiggerStatusResponse;
}

export type ApiResponse<T> = AxiosResponse<DiggerResponse<T>>;

export type ApiError<T> = { response: ApiResponse<T> }

export interface DataFetchResponse extends ApiResponse<{result: boolean}> {}

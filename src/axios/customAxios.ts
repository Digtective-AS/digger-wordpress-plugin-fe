import axios from 'axios';
import {rootConfigs} from "../config.ts";
import axiosInterceptor from "./axiosInterceptors.tsx";

export const authFetch = axios.create({
    baseURL: `${window.location.origin}/wordpress/`,
    headers: {
        Accept: 'application/json',
    },
});

export const dataFetchDigger = axios.create({
    baseURL: rootConfigs.baseDiggerApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInterceptor();

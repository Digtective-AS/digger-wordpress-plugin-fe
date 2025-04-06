import axios from 'axios';
import {rootConfigs} from "../config.ts";
import axiosInterceptor from "./axiosInterceptors.tsx";

export const authFetch = axios.create({
    // baseURL: `${window.location.origin}/wordpress/`,
    baseURL: `${window.location.origin}/`,
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

export const dataFetchCore = axios.create({
    baseURL: rootConfigs.baseCoreApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

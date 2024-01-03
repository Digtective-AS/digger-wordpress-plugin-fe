import axios from 'axios';
import {rootConfigs} from "../config.ts";

export const authFetch = axios.create({
    baseURL: rootConfigs.baseCoreApiUrl,
    headers: {
        Accept: 'application/json',
    },
});

export const dataFetch = axios.create({
    baseURL: rootConfigs.baseApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const dataFetchDigger = axios.create({
    baseURL: rootConfigs.baseDiggerApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const onlineDataFetch = axios.create({
    baseURL: rootConfigs.baseCoreApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
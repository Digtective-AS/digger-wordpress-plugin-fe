import axios from 'axios';
import config from '../config';

export const authFetch = axios.create({
    baseURL: config.baseCoreApiUrl,
    headers: {
        Accept: 'application/json',
    },
});

export const dataFetch = axios.create({
    baseURL: config.baseApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const dataFetchDigger = axios.create({
    baseURL: config.baseDiggerApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const onlineDataFetch = axios.create({
    baseURL: config.baseCoreApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
import axios from 'axios';
import config, {Config} from '../config';

const rootConfigs = {
    baseApiUrl: 'https://api-digger-v2.digtective.com/digger-dashboard/api/',
    baseCoreApiUrl: 'https://api-digger-v2.digtective.com/digger-core-api/',
    baseDiggerApiUrl: 'https://api-digger-v2.digtective.com/digger-dashboard/api/',
};

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
    baseURL: config.baseCoreApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
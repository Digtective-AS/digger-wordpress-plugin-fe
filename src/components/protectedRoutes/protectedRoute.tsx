import {Navigate, useLocation, useSearchParams} from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { dataFetch, dataFetchDigger, onlineDataFetch } from '../../axios/customAxios';
import axiosInterceptor from '../../axios/axiosInterceptors';

interface ProtectedRouteProps {
    children: React.ReactElement<any, any> | null;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        dataFetch.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        onlineDataFetch.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        dataFetchDigger.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }, [isLoggedIn]);

    axiosInterceptor();

    return props.children;
};

export default ProtectedRoute;

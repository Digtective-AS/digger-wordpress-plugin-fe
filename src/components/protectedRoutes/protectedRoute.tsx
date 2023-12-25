import React, {FC, useEffect} from 'react';
import {useAuthStore} from '../../store/authStore';
import {dataFetch, dataFetchDigger, onlineDataFetch} from '../../axios/customAxios';
import axiosInterceptor from '../../axios/axiosInterceptors';
import ConnectToDigger from "../connectToDigger/connectToDigger.tsx";
import useGetOrganizationSettings from "../../apiHooks/queries/useGetOrganizations.tsx";
import {OrganizationSettingsInterface} from "../../interfaces/organizationSettings.interface.ts";
import {useOrganizationSettingsStore} from "../../store/organizationSettingsStore.tsx";
import {ORGANIZATION_SETTINGS} from "../../constants/pageIdentifiers.ts";
import LoadingSpinner from "../loadingSpinner/loadingSpinner.tsx";

interface ProtectedRouteProps {
    children: React.ReactElement<any, any> | null;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const {isLoggedIn} = useAuthStore();
    const setOrganizationSettings = useOrganizationSettingsStore((state) => state.setOrganizationSettings);

    const onOrganizationSettingsRetrieved = (organizationSettingsRetrieved: OrganizationSettingsInterface) => {
        setOrganizationSettings(organizationSettingsRetrieved);
    };

    const {
        data: organizationSettings,
        isLoading: isLoadingOrganizationSettings,
        isError: isErrorOrganizationSettings,
    } = useGetOrganizationSettings(ORGANIZATION_SETTINGS, onOrganizationSettingsRetrieved);

    useEffect(() => {
        dataFetch.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        onlineDataFetch.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        dataFetchDigger.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }, [isLoggedIn]);

    axiosInterceptor();

    if (!isLoggedIn) return (<ConnectToDigger/>);

    if (isLoadingOrganizationSettings) return (
        <div className="h-[calc(100vh-128px)]">
            <LoadingSpinner center color="primary"/>
        </div>
    );

    if (isErrorOrganizationSettings) return (
        <div className="h-[calc(100vh-128px)]">
            Something went wrong
        </div>
    );

    if (organizationSettings) return (props.children);
};

export default ProtectedRoute;

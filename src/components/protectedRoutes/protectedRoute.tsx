import React, {FC, useEffect} from 'react';
import {useAuthStore} from '../../store/authStore';
import {dataFetch, dataFetchDigger, onlineDataFetch} from '../../axios/customAxios';
import axiosInterceptor from '../../axios/axiosInterceptors';
import ConnectToDigger from "../connectToDigger/connectToDigger.tsx";
import useGetOrganizationSettings from "../../apiHooks/queries/useGetOrganizations.tsx";
import {OrganizationSettingsInterface} from "../../interfaces/organizationSettings.interface.ts";
import {useOrganizationSettingsStore} from "../../store/organizationSettingsStore.tsx";
import {FETCHED_TOKEN, ORGANIZATION_SETTINGS} from "../../constants/pageIdentifiers.ts";
import LoadingSpinner from "../loadingSpinner/loadingSpinner.tsx";
import useGetToken from "../../apiHooks/queries/useGetToken.tsx";

interface ProtectedRouteProps {
  children: React.ReactElement<any, any> | null;
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const {isLoggedIn} = useAuthStore();

  const login = useAuthStore((state) => state.login);
  const onFetchedTokenRetrieved = (fetchedTokenRetrieved: string) => {
    login(fetchedTokenRetrieved);
  };
  const {
    data: fetchedToken,
    isFetching: isLoadingFetchedToken,
    isError: isErrorFetchedToken,
  } = useGetToken(FETCHED_TOKEN, onFetchedTokenRetrieved);

  axiosInterceptor()

  if (isLoadingFetchedToken) return (
    <div className="h-[calc(100vh-128px)]">
      <LoadingSpinner center color="primary"/>
    </div>
  );

  if (isErrorFetchedToken) return (
    <div className="h-[calc(100vh-128px)]">
      Something went wrong
    </div>
  );

  if (!fetchedToken && !isLoggedIn) return (<ConnectToDigger/>);

  return (props.children);
};

export default ProtectedRoute;

import React from 'react';
import HubspotFormsTable from "../../components/tables/hubspotFormsTable.tsx";
import {CustomButton} from "../../components/buttons/customButton.tsx";
import {hubspotIntegrationUrl} from "../../constants/integrationConstants.tsx";
import {useIsConnectedToHubspot} from "../../apiHooks/queries/useGetHubspotForms.ts";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner.tsx";
import {useAuthStore} from "../../store/authStore.tsx";

const HubspotTab = () => {
  const {
    data,
    isFetching,
    isError
  } = useIsConnectedToHubspot();

  console.log(data)
  if (isFetching) {
    return <div className="h-[calc(100vh-128px)]">
      <LoadingSpinner center color="primary"/>
    </div>
  }

  if (isError) {
    return <div className="h-[calc(100vh-128px)]">
      Something went wrong
    </div>
  }

  if (data?.data.status.message !== 'gatheredEmbedData') {
    return (
      <CustomButton type="button" onClick={() => window.location.replace(hubspotIntegrationUrl)}>
        Connect to Hubspot
      </CustomButton>
    )
  }

  return (
    <HubspotFormsTable/>
  );
};

export default HubspotTab;

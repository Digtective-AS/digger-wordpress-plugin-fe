import React from 'react';
import HubspotFormsTable from "../../components/tables/hubspotFormsTable.tsx";
import {CustomButton} from "../../components/buttons/customButton.tsx";
import {hubspotIntegrationUrl} from "../../constants/integrationConstants.tsx";

const HubspotTab = () => {
    const isConnectedToHubspot = true;

    if (!isConnectedToHubspot) {
        return (
            <CustomButton type="button" onClick={() => window.location.replace(hubspotIntegrationUrl)}>
                Connect To Hubspot
            </CustomButton>
        )
    }

    return (
        <HubspotFormsTable/>
    );
};

export default HubspotTab;
import React from 'react';
import HubspotFormsTable from "../../components/tables/hubspotFormsTable.tsx";
import {CustomButton} from "../../components/buttons/customButton.tsx";
import {hubspotIntegrationUrl} from "../../constants/integrationConstants.tsx";
import {useOrganizationSettingsStore} from "../../store/organizationSettingsStore.tsx";

const HubspotTab = () => {
    const organizationSettings = useOrganizationSettingsStore((state) => state.organizationSettings);

    if (!organizationSettings.isConnectedToHubspot) {
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
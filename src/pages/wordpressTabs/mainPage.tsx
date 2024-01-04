import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import SimpleTabs from "../../components/tabs/simpleTabs.tsx";
import HubspotTab from "./hubspotTab.tsx";
import {useOrganizationSettingsStore} from "../../store/organizationSettingsStore.tsx";
import {OrganizationSettingsInterface} from "../../interfaces/organizationSettings.interface.ts";
import useGetOrganizationSettings from "../../apiHooks/queries/useGetOrganizations.tsx";
import {ORGANIZATION_SETTINGS} from "../../constants/pageIdentifiers.ts";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner.tsx";

enum WordpressTabLinks {
    'hubspot',
    'google',
}

const MainPage = () => {
    const location = useLocation();
    const currentTab = location.pathname.split('/').pop();
    const [activePanel, setActivePanel] = useState<number>(WordpressTabLinks[currentTab as keyof typeof WordpressTabLinks] || 0);
    const setOrganizationSettings = useOrganizationSettingsStore((state) => state.setOrganizationSettings);

    const onOrganizationSettingsRetrieved = (organizationSettingsRetrieved: OrganizationSettingsInterface) => {
        setOrganizationSettings(organizationSettingsRetrieved);
    };

    const {
        data: organizationSettings,
        isFetching: isLoadingOrganizationSettings,
        isError: isErrorOrganizationSettings,
    } = useGetOrganizationSettings(ORGANIZATION_SETTINGS, onOrganizationSettingsRetrieved);

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

    if (organizationSettings) return (
        <div className="bg-white h-[calc(100vh-128px)] min-h-[500px] w-[calc(100%-20px)] mt-4">
            <SimpleTabs
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                tabs={[
                    {
                        tabLabel: 'Hubspot',
                        href: 'hubspot',
                        identifierName: 'hubspot-panel',
                        renderedComponent: <HubspotTab/>,
                    },
                ]}
            />
        </div>
    );
};

export default MainPage;

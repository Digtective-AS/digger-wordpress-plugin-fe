import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import SimpleTabs from "../../components/tabs/simpleTabs.tsx";
import HubspotTab from "./hubspotTab.tsx";
import {useIsConnectedToHubspotStore} from "../../store/organizationSettingsStore.tsx";
import {useGetHubspotFormEmbedData, useIsConnectedToHubspot} from "../../apiHooks/queries/useGetHubspotForms.ts";
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner.tsx";

enum WordpressTabLinks {
  'hubspot',
  'google',
}

const MainPage = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();
  const [activePanel, setActivePanel] = useState<number>(WordpressTabLinks[currentTab as keyof typeof WordpressTabLinks] || 0);

    return (
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
    )
};

export default MainPage;

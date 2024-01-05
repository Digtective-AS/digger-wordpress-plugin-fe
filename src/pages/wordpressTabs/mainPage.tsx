import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import SimpleTabs from "../../components/tabs/simpleTabs.tsx";
import HubspotTab from "./hubspotTab.tsx";

enum WordpressTabLinks {
  'hubspot',
  'google',
}

const MainPage = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();
  const [activePanel, setActivePanel] = useState<number>(WordpressTabLinks[currentTab as keyof typeof WordpressTabLinks] || 0);

  return (
    <div className="bg-white min-h-[calc(100vh-128px)] w-[calc(100%-20px)] mt-4">
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

import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import SimpleTabs from "../../components/tabs/simpleTabs.tsx";
import HubspotTab from "./hubspotTab.tsx";
import TopHeader from "../../components/topHeader/TopHeader.tsx";
import securityCheck from '../../assets/icons/securityCheck.svg';
import {useGetOrganizationName} from "../../apiHooks/queries/useGetOrganization.ts";

enum WordpressTabLinks {
  'hubspot',
  'google',
}

const MainPage = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop();
  const [activePanel, setActivePanel] = useState<number>(WordpressTabLinks[currentTab as keyof typeof WordpressTabLinks] || 0);

  const { data } = useGetOrganizationName("GET_ORGANIZATION");

  const organizationName = data ? data?.data.data.name : ''

  return (
      <>
        <TopHeader />
        <div className="bg-white flex flex-col gap-4 p-[24px] min-h-[148px] rounded-lg text-primary w-[calc(100%-20px)] mt-4">
          <p className="text-2xl font-semibold" >Welcome , {organizationName}</p>
            <p className="text-base">Welcome to Digger by Digtective! Thank you for installing Digger, your all-in-one solution for effortless website tracking and data insights. <br/>
            You’re now just a few steps away from unlocking valuable analytics and making data-driven decisions with ease.</p>
        </div>
          <div className="bg-white flex flex-col justify-start items-center gap-12 p-8 rounded-lg h-[330px] w-[360px] mt-4">
              <p className="text-2xl font-semibold text-primary">Security Token</p>
              <div className="flex flex-col text-center justify-center items-center gap-2">
              <img className="h-[48px] w-[48px]" src={securityCheck} alt=""/>
                  <p className="text-xl font-semibold text-[#4C956C]">Security token has been <br/>updated.</p>
              </div>
          </div>
      </>
  )
};

export default MainPage;

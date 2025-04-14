import React, {useEffect, useState} from "react";
import settingIcon from "../../assets/icons/settingIcon.svg";
import generalIcon from "../../assets/icons/generalIcon.svg";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
import adProviderIcon from '../../assets/icons/adProviderIcon.svg';
import hubspot from '../../assets/icons/sidebarHubspot.svg';
import woo from '../../assets/icons/sidebarWoo.svg';
import salesforce from '../../assets/icons/sidebarSalesforce.svg';
import meta from '../../assets/icons/sidebarMeta.svg';
import linkedin from '../../assets/icons/sidebarLinkedin.svg';
import google from '../../assets/icons/sidebarGoogle.svg';
import bing from '../../assets/icons/sidebarBing.svg';
import tiktok from '../../assets/icons/sidebarTiktok.svg';
import {useGetOrganizationName} from "../../apiHooks/queries/useGetOrganization.ts";
import {useGetIntegrations} from "../../apiHooks/queries/useGetIntegrations.ts";

const Sidebar = () => {
    const [openSection, setOpenSection] = useState(null);
    const navigate = useNavigate();

    const { data } = useGetOrganizationName("GET_ORGANIZATION");

    const { data: integrationData } = useGetIntegrations("GET_INTEGRATIONS");

    const integrationsHubspot = integrationData?.data?.data.hubspot;

    const integrationsSalesforce = integrationData?.data?.data.salesforce;

    const organization = data?.data?.data?.organizationType

    useEffect(() => {
        if(data?.data?.data.organizationType != null) {
            navigate('integrations/woocommerce')
        }
    },[data])

    const toggleSection = (section: any) => {
        setOpenSection((prev) => (prev === section ? null : section));
    };

    return (
        <div className="bg-white w-[217px] h-[424px] rounded-lg mt-4 px-4 py-6 flex flex-col gap-2">
            <div
                onClick={() => {
                    if (!organization) return;

                    if (organization === 'eCommerce') {
                        navigate('/integrations/woocommerce');
                    } else {
                        if (integrationsHubspot && integrationsSalesforce || !integrationsSalesforce && !integrationsHubspot) {
                            navigate('/integrations/crm');
                        } else if (integrationsHubspot) {
                            navigate('/integrations/hubspot');
                        } else if (integrationsSalesforce) {
                            navigate('/integrations/salesforce');
                        } else {
                            console.warn('No CRM integration available.');
                        }
                    }
                }}
                className="bg-[#CEDADF] w-full p-3 rounded-lg flex items-center gap-2 hover:cursor-pointer"
            >
                <img src={settingIcon} alt="Setup" />
                <span>Setup</span>
            </div>

            <div className="w-full">
                <button
                    className={`${openSection === "general" ? 'bg-[#CEDADF]' : 'bg-white'} w-full p-3 rounded-lg flex items-center justify-between`}
                    onClick={() => toggleSection("general")}
                >
                    <div className="flex items-center gap-2">
                        <img src={generalIcon} alt="General" />
                        <span>General</span>
                    </div>
                    <img
                        src={arrow}
                        alt="Toggle"
                        className={`transform transition-transform duration-200 ${
                            openSection === "general" ? "rotate-90" : "rotate-0"
                        }`}
                    />
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        openSection === "general" ? "max-h-40" : "max-h-0"
                    }`}
                >
                    <ul className="pl-8 pt-2 flex flex-col gap-2">
                        <li onClick={() => navigate('integrations/hubspot')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={hubspot} alt="Sub Item" />
                            Hubspot
                        </li>
                        <li onClick={() => navigate('integrations/woocommerce')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={woo} alt="Sub Item" />
                            WooCommerce
                        </li>
                        <li onClick={() => navigate('integrations/salesforce')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={salesforce} alt="Sub Item" />
                            Salesforce
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full">
                <button
                    className={`${openSection === "providers" ? 'bg-[#CEDADF]' : 'bg-white'} w-full p-3 rounded-lg flex items-center justify-between`}
                    onClick={() => toggleSection("providers")}
                >
                    <div className="flex items-center gap-2">
                        <img src={adProviderIcon} alt="Ad Providers" />
                        <span>Ad Providers</span>
                    </div>
                    <img
                        src={arrow}
                        alt="Toggle"
                        className={`transform transition-transform duration-200 ${
                            openSection === "providers" ? "rotate-90" : "rotate-0"
                        }`}
                    />
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        openSection === "providers" ? "max-h-40" : "max-h-0"
                    }`}
                >
                    <ul className="pl-8 pt-2 flex flex-col gap-2">
                        <li onClick={() => window.location.replace('https://digger-v2.digtective.com/integrations/ad-providers/facebook')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={meta} alt="Sub Item" />
                            Meta
                        </li>
                        <li onClick={() => window.location.replace('https://digger-v2.digtective.com/integrations/ad-providers/google')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={google} alt="Sub Item" />
                            Google Ads
                        </li>
                        <li onClick={() => window.location.replace('https://digger-v2.digtective.com/integrations/ad-providers/linked-in')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={linkedin} alt="Sub Item" />
                            LinkedIn
                        </li>
                        <li onClick={() => window.location.replace('https://digger-v2.digtective.com/integrations/ad-providers/bing')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={bing} alt="Sub Item" />
                            Bing
                        </li>
                        <li onClick={() => window.location.replace('https://digger-v2.digtective.com/integrations/ad-providers/tik-tok')} className="flex hover:cursor-pointer items-center gap-2">
                            <img src={tiktok} alt="Sub Item" />
                            Tiktok
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

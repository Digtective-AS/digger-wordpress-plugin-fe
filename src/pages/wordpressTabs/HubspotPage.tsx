import React from "react";
import hubspot from "../../assets/icons/hubspot.svg";
import greenTick from "../../assets/icons/greenTick.svg";
import {useGetIntegrations} from "../../apiHooks/queries/useGetIntegrations.ts";
import meta from '../../assets/icons/meta.svg';
import googleAds from '../../assets/icons/googleAds.svg';
import linkedIn from '../../assets/icons/linkedIn.svg';
import bing from '../../assets/icons/bing.svg';
import tiktok from '../../assets/icons/tiktok.svg';


const HubSpotIntegration = () => {

    const { data: integrationData } = useGetIntegrations("GET_INTEGRATIONS");

    const integrations = integrationData?.data?.data || {};

    return (
        <>
        <div className="p-6 bg-white w-[calc(100%-20px)] rounded-lg flex items-center justify-between mt-4">
            <p className="text-primary font-medium text-2xl">{integrations.hubspot ? 'Connected' :'Connect Hubspot with Digger'}</p>
            <a target="_blank" href="https://digger-v2.digtective.com/integrations/crm/hubspot"
               className={`border w-[179px] h-[62px] relative rounded-lg flex gap-2 items-center justify-center p-4 ${integrations.hubspot ? 'bg-[#DBEAE2] border-[#4C956C]' : ''}`}>
                <img className="h-[31px] w-[31px]" src={hubspot} alt="Hubspot" />
                <p className="text-base text-primary">HubSpot</p>
                {integrations.hubspot &&
                    <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                        <img src={greenTick} alt=""/>
                    </div>
                }
            </a>
        </div>
            {integrations.hubspot &&
            <div className="w-[calc(100%-20px)] flex justify-start gap-4">
                <div
                    className={`bg-white flex flex-col justify-start items-start w-full gap-4 p-8 rounded-lg h-[197px] w-full mt-4 transition-all duration-300 `}
                >
                    <p>Connect your Ad Providers to Digger</p>

                    <div className="flex justify-between w-full gap-4 items-center">
                        <a target="_blank" href="https://digger-v2.digtective.com/integrations/ad-providers/google"
                           className={`border w-full h-[81px] relative gap-4 rounded-lg flex items-center justify-center p-4 ${integrations.google ? "bg-[#DBEAE2] border-[#4C956C]" : ""}`}>
                            <img src={googleAds} alt="Google Ads" />
                            <p>Google Ads</p>
                            {integrations.google &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </a>
                        <a target="_blank" href="https://digger-v2.digtective.com/integrations/ad-providers/facebook"
                           className={`border w-full h-[81px] gap-4 relative rounded-lg flex items-center justify-center p-4 ${integrations.facebook ? "bg-[#DBEAE2] border-[#4C956C]" : ""}`}>
                            <img src={meta} alt="Meta" />
                            <p>Meta</p>
                            {integrations.facebook &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </a>
                        <a target="_blank" href="https://digger-v2.digtective.com/integrations/ad-providers/bing"
                           className={`border w-full h-[81px] relative gap-4 rounded-lg flex items-center justify-center p-4 ${integrations.microsoft ? "bg-[#DBEAE2] border-[#4C956C]" : ""}`}>
                            <img src={bing} alt="Bing" />
                            <p>Bing</p>
                            {integrations.microsoft &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </a>
                        <a target="_blank" href="https://digger-v2.digtective.com/integrations/ad-providers/bing"
                           className={`border w-full h-[81px] relative gap-4 rounded-lg flex items-center justify-center p-4 ${integrations.tiktok ? "bg-[#DBEAE2] border-[#4C956C]" : ""}`}>
                            <img src={tiktok} alt="Bing" />
                            <p>Tiktok</p>
                            {integrations.tiktok &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </a>
                        <a target="_blank" href="https://digger-v2.digtective.com/integrations/ad-providers/linked-in"
                           className={`border w-full h-[81px] relative  gap-4 rounded-lg flex items-center justify-center p-4 ${integrations.linkedin ? "bg-[#DBEAE2] border-[#4C956C]" : ""}`}>
                            <img src={linkedIn} alt="LinkedIn" />
                            <p>LinkedIn</p>
                            {integrations.linkedin &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </a>
                        <div />
                        <div />
                    </div>
                </div>
            </div>
            }
            </>
    );
};

export default HubSpotIntegration;
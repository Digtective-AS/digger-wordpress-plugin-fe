import React, { useState } from 'react';
import securityCheck from "../../assets/icons/securityCheck.svg";
import eCommerceButton from "../../assets/icons/eCommerceButton.svg";
import CRMbutton from "../../assets/icons/CRMbutton.svg";
import hubspot from "../../assets/icons/hubspot.svg";
import salesforce from "../../assets/icons/salesforce.svg";
import greenTick from "../../assets/icons/greenTick.svg";
import { useGetOrganizationName } from "../../apiHooks/queries/useGetOrganization.ts";
import { useNavigate } from "react-router-dom";
import useChangeOrganization from "../../apiHooks/mutations/organizationTypeMutation.ts";
import {useGetIntegrations} from "../../apiHooks/queries/useGetIntegrations.ts";

const SetupPage = () => {
    const { data } = useGetOrganizationName("GET_ORGANIZATION");
    const { mutate: changeOrganization } = useChangeOrganization();
    const organizationName = data ? data?.data.data.name : "";
    const navigate = useNavigate();
    const { data: integrationData } = useGetIntegrations("GET_INTEGRATIONS");

    const integrations = integrationData?.data?.data || {};


    const [organizationType, setOrganizationType] = useState<string | null>(null);

    const handleOrganizationChange = (type: string) => {
        changeOrganization(type);
        setOrganizationType(type);
    };

    return (
        <div className="flex flex-col w-full">
            <div className="bg-white flex flex-col gap-4 p-6 min-h-[148px] rounded-lg text-primary w-[calc(100%-20px)] mt-4">
                <p className="text-2xl font-semibold">Welcome, {organizationName}</p>
                <p className="text-base">
                    Welcome to Digger by Digtective! Thank you for installing Digger, your all-in-one solution for effortless
                    website tracking and data insights. <br />
                    You’re now just a few steps away from unlocking valuable analytics and making data-driven decisions with ease.
                </p>
            </div>

            {!organizationType && (
                <div className="bg-white flex justify-between items-center gap-12 p-4 rounded-lg h-[100px] w-[calc(100%-20px)] mt-4">
                    <p className="text-2xl font-semibold text-primary">API Token</p>
                    <div className="flex text-center justify-center items-center gap-2">
                        <p className="text-xl font-semibold text-[#4C956C]">API token has been updated.</p>
                        <img className="h-[24px] w-[24px]" src={securityCheck} alt="Security Check" />
                    </div>
                </div>
            )}

            <div className="w-[calc(100%-20px)] h-[142px] mt-4 text-primary rounded-lg bg-white p-4 flex justify-between gap-4">
                <div className="flex flex-col justify-center gap-4">
                    <p className="text-primary text-2xl font-semibold">Quick Setup</p>
                    <p className="text-primary text-base">
                        Connect your account based on your E-commerce <br/> choice or your CRM choice
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        className="border font-normal bg-primary flex gap-2 items-center justify-center rounded-lg border-[#CEDADF] px-6 py-3 text-white text-base"
                        onClick={() => { handleOrganizationChange("eCommerce"); navigate('integrations/woocommerce');}}
                    >
                        E-Commerce <img className="h-[24px] w-[24px]" src={eCommerceButton} alt="E-Commerce Button" />
                    </button>
                    OR
                    <button
                        className="border font-normal flex gap-2 bg-primary items-center justify-center rounded-lg border-[#CEDADF] px-6 py-3 text-white text-base"
                        onClick={() => handleOrganizationChange("loanBroker")}
                    >
                        CRM Integration <img className="h-[24px] w-[24px]" src={CRMbutton} alt="CRM Button" />
                    </button>
                </div>
            </div>

            {organizationType && (
                <div className="w-[calc(100%-20px)] mt-4 text-primary rounded-lg bg-white p-4 flex justify-between items-center gap-6">
                    <p className="text-2xl text-primary font-medium">Connect your CRM with Digger</p>
                    <div className="flex items-center gap-4">
                        <div onClick={() => navigate('integrations/hubspot')}
                           className={`border w-[179px] h-[62px] relative rounded-lg flex gap-2 items-center justify-center p-4 ${integrations.hubspot ? 'bg-[#DBEAE2] border-[#4C956C]' : ''}`}>
                            <img className="h-[31px] w-[31px]" src={hubspot} alt="Hubspot" />
                            <p className="text-base text-primary">HubSpot</p>
                            {integrations.hubspot &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </div>

                        <div onClick={() => navigate('integrations/salesforce')}
                           className={`border w-[179px] h-[62px] relative rounded-lg flex gap-2 items-center justify-center p-4 ${integrations.salesforce ? 'bg-[#DBEAE2] border-[#4C956C]' : ''}`}>
                            <img className="h-[31px] w-[31px]" src={salesforce} alt="Hubspot" />
                            <p className="text-base text-primary">Salesforce</p>
                            {integrations.salesforce &&
                                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                                    <img src={greenTick} alt=""/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetupPage;

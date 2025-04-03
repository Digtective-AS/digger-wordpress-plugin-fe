import React from "react";
import salesforce from "../../assets/icons/salesforce.svg";
import greenTick from "../../assets/icons/greenTick.svg";
import {useGetIntegrations} from "../../apiHooks/queries/useGetIntegrations.ts";

const SalesforceIntegration = () => {

    const { data: integrationData } = useGetIntegrations("GET_INTEGRATIONS");

    const integrations = integrationData?.data?.data || {};

    return (
        <div className="p-6 bg-white w-[calc(100%-20px)] rounded-lg flex items-center justify-between mt-4">
            <p className="text-primary font-medium text-2xl">{integrations.salesforce ? 'Connected' :'Connect Salesforce with Digger'}</p>
            <a target="_blank" href="https://digger-v2.digtective.com/integrations/crm/salesforce"
               className={`border w-[179px] h-[62px] relative rounded-lg flex gap-2 items-center justify-center p-4 ${integrations.salesforce ? 'bg-[#DBEAE2] border-[#4C956C]' : ''}`}>
                <img className="h-[31px] w-[31px]" src={salesforce} alt="Hubspot" />
                <p className="text-base text-primary">Salesforce</p>
                {integrations.salesforce &&
                <div className="bg-white rounded-bl-lg rounded-tr-lg p-1 right-0 top-0 absolute">
                    <img src={greenTick} alt=""/>
                </div>
                }
            </a>
        </div>
    );
};

export default SalesforceIntegration;
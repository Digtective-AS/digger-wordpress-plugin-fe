import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import SimpleTabs from "../../components/tabs/simpleTabs.tsx";
import {dividerClasses} from "@mui/material";
import HubspotFormsTable from "../../components/tables/hubspotFormsTable.tsx";
import HubspotTab from "./hubspotTab.tsx";
import {CustomButton} from "../../components/buttons/customButton.tsx";
import closableEnqueueSnackbar from "../../components/closableEnqueueSnackbar/closableEnqueueSnackbar.tsx";
import {useTranslation} from "react-i18next";
import {FormikValues, useFormik} from "formik";
import {digtectiveTokenValidationSchema} from "../../components/validations/digtectiveTokenValidationSchema.ts";
import TextInput from "../../components/inputs/textInput.tsx";
import ConnectToDigger from "../../components/connectToDigger/connectToDigger.tsx";
import {useAuthStore} from "../../store/authStore.tsx";

enum WordpressTabLinks {
    'hubspot',
    'google',
}

const MainPage = () => {
    const location = useLocation();
    const currentTab = location.pathname.split('/').pop();
    const [activePanel, setActivePanel] = useState<number>(WordpressTabLinks[currentTab as keyof typeof WordpressTabLinks] || 0);

    return (
        <div className="bg-white h-[calc(100vh-128px)] min-h-[500px] w-[calc(100%-20px)]  mt-4">
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
                    // {
                    //     tabLabel: 'Google',
                    //     href: 'google',
                    //     identifierName: 'google-panel',
                    //     renderedComponent: <div> google </div>
                    // },
                ]}
            />
        </div>
    );
};

export default MainPage;

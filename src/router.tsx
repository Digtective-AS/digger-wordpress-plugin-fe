import { createHashRouter } from "react-router-dom";
import React from "react";
import MainPage from "./pages/wordpressTabs/mainPage.tsx";
import ProtectedRoute from "./components/protectedRoutes/protectedRoute.tsx";
import SetupPage from "./pages/wordpressTabs/setupPage.tsx";
import CrmIntegration from "./pages/wordpressTabs/CrmIntegrations.tsx";

const HubSpotIntegration = React.lazy(() => import("./pages/wordpressTabs/HubspotPage.tsx"));
const SalesforceIntegration = React.lazy(() => import("./pages/wordpressTabs/SalesForcePage.tsx"));
const WoocommerceIntegration = React.lazy(() => import("./pages/wordpressTabs/WoocommercePage.tsx"));

const router = createHashRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>
        ),
        errorElement: <div>Something went wrong...</div>,
        children: [
            {
                index: true,
                element: <SetupPage />,
            },
            {
                path: "integrations/crm",
                element: (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <CrmIntegration />
                    </React.Suspense>
                ),
            },
            {
                path: "integrations/hubspot",
                element: (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <HubSpotIntegration />
                    </React.Suspense>
                ),
            },
            {
                path: "integrations/salesforce",
                element: (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <SalesforceIntegration />
                    </React.Suspense>
                ),
            },
            {
                path: "integrations/woocommerce",
                element: (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <WoocommerceIntegration />
                    </React.Suspense>
                ),
            },
        ],
    },
]);

export default router;

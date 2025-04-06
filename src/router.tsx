import { createBrowserRouter } from "react-router-dom";
import React from "react";
import MainPage from "./pages/wordpressTabs/mainPage.tsx";
import ProtectedRoute from "./components/protectedRoutes/protectedRoute.tsx";
import SetupPage from "./pages/wordpressTabs/setupPage.tsx";

const HubSpotIntegration = React.lazy(() => import("./pages/wordpressTabs/HubspotPage.tsx"));
const SalesforceIntegration = React.lazy(() => import("./pages/wordpressTabs/SalesForcePage.tsx"));
const WoocommerceIntegration = React.lazy(() => import("./pages/wordpressTabs/WoocommercePage.tsx"));

const router = createBrowserRouter([
    {
        path: "/wp-admin/admin.php",
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

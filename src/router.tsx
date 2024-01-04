import {createBrowserRouter} from 'react-router-dom';
import React from 'react';
import MainPage from "./pages/wordpressTabs/mainPage.tsx";
import ProtectedRoute from "./components/protectedRoutes/protectedRoute.tsx";


const router = createBrowserRouter([
    {
        path: '/wp-admin/admin.php',
        // path: '/wordpress/wp-admin/admin.php',
        element: <ProtectedRoute>
            <MainPage/>
        </ProtectedRoute>,
        errorElement: <div> Something went wrong... </div>,
    },
]);

export default router;

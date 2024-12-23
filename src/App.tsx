import React from 'react';
import {RouterProvider, useSearchParams} from "react-router-dom";
import router from "./router.tsx";

const App = () => (
    <RouterProvider router={router}/>
);

export default App;

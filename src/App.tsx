import React from 'react';
import {RouterProvider, useSearchParams} from "react-router-dom";
import router from "./router.tsx";
import ConnectToDigger from "./components/connectToDigger/connectToDigger.tsx";

const App = () => (
    <RouterProvider router={router}/>
);

export default App;
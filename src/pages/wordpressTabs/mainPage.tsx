import React, { useState } from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import TopHeader from "../../components/topHeader/TopHeader.tsx";
import Sidebar from "../../components/sidebar/Sidebar.tsx";

const MainPage = () => {
    return (
        <>
            <TopHeader />
            <div className="flex gap-2">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MainPage;

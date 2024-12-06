import React, { useContext } from "react";

import { Outlet } from "react-router-dom";
import SideNav from "../components/sidenav";
import MainHeader from "../components/header";

const PrimaryLayout = () => {

    return (
        <div>
            <SideNav />
            <MainHeader />
            <main className="main-layout"
            >
                <Outlet />
            </main>
        </div>
    );
};

export default PrimaryLayout;

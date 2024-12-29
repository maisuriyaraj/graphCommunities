import React, { useContext } from "react";

import { Outlet } from "react-router-dom";
import SideNav from "../components/sidenav";
import MainHeader from "../components/header";
import { SocketProvider } from "../../Contexts/SocketContext";

const PrimaryLayout = () => {

    return (
        <SocketProvider>
            <div>
                <SideNav />
                <MainHeader />
                <main className="main-layout">
                    <Outlet />
                </main>
            </div>
        </SocketProvider>
    );
};

export default PrimaryLayout;

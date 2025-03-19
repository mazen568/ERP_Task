import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { useState } from "react";

const RootLayout = ( ) => {
    const [completedTasks, setCompletedTasks] = useState([]);

    
    return (
        <>
            <NavBar />
            <Outlet context={{ completedTasks, setCompletedTasks }} />
            </>
    );
};

export default RootLayout;

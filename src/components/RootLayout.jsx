import { Outlet } from "react-router";
import NavBar from "./NavBar";

const RootLayout = ({ allTasks, updateAllTasks, isLoading, error }) => {
    console.log(allTasks);
    
    return (
        <>
            <NavBar />
            <Outlet context={{ allTasks, updateAllTasks, isLoading, error }} />
        </>
    );
};

export default RootLayout;

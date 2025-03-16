import { Outlet } from "react-router";
import NavBar from "./NavBar";
const RootLayout =()=>{
    return (<>
    <NavBar/>
    <Outlet/>
    </>);
}
export default RootLayout;

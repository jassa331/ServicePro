import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";

export default function MainLayout() {
    return (
        <div>
            <NavMenu />
            <hr />
            <Outlet />
        </div>
    );
}

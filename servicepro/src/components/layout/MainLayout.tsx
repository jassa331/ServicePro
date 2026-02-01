import { Outlet } from "react-router-dom";
import NavMenu from "../layout/NavMenu";
import "../../assets/css/MainLayout.css";

export default function MainLayout() {
    return (
        <div className="layout">
            {/* LEFT SIDEBAR */}
            <NavMenu />

            {/* RIGHT CONTENT */}
            <div className="main-content">
                {/* TOP BAR */}
                <div className="top-bar">
                    <h3>Dashboard</h3>
                </div>

                {/* PAGE CONTENT */}
                <Outlet />
            </div>
        </div>
    );
}

import { Outlet, useNavigate } from "react-router-dom"; // import useNavigate
import NavMenu from "../layout/NavMenu";
import "../../assets/css/MainLayout.css";

export default function MainLayout() {
    const navigate = useNavigate(); // ✅ inside component

    return (
        <div className="layout">
            {/* LEFT SIDEBAR */}
            <NavMenu />

            {/* RIGHT CONTENT */}
            <div className="main-content">
                {/* TOP BAR */}
                <div className="top-bar">
                    <h3>Dashboard</h3>

                    <input
                        type="text"
                        placeholder="Find"
                        className="search-input"
                    />

                    <button className="icon-btn">
                        <i className="fa-solid fa-gear"></i>
                    </button>
                    <button className="icon-btn">
                        <i className="fa-solid fa-calendar-days"></i>
                    </button>
                    <button className="icon-btn">
                        <i className="fa-solid fa-bell"></i>
                    </button>
                    <button className="icon-btn">
                        <i className="fa-solid fa-comment"></i>
                    </button>
                    <button
                        className="icon-btn"
                        onClick={() => alert("Invoice clicked!")}
                    >
                        <i className="fa-file-invoice"></i>
                    </button>
                    <button
                        className="icon-btn"
                        onClick={() => navigate("/address-booking")}
                    >
                        <i className="fa-solid fa-location-dot"></i>
                    </button>
                </div>

                {/* PAGE CONTENT */}
                <Outlet />
            </div>
        </div>
    );
}

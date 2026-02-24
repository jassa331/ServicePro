import "../../assets/css/NavMenu.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const NavMenu: React.FC = () => {

    // ✅ State for mobile toggle
    const [menuOpen, setMenuOpen] = useState(false);
 
    return (
        <nav className="navbar">

            {/* ===== LOGO ===== */}
            <div className="logo">
                <div className="logo-top">
                    <span className="logo-main">S.R ENTERPRISE</span>
                    <span className="logo-sub">Cement, Iron & Steel Trader</span>
                </div>

                <div className="logo-bottom">
                    <span className="location">
                        📍 Agra, Uttar Pradesh
                    </span>

                    <span className="gst">
                        GST NO: 09JFUPS2230L1ZL
                    </span>
                </div>
            </div>

            {/* ✅ Toggle Button (Mobile) */}
            <div
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ⋮
            </div>

            {/* ===== MENU ===== */}
            <ul className={`menu ${menuOpen ? "active" : ""}`}>
                <li><Link to="/products">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>


            {/* ===== CALL BUTTON ===== */}
            <div className="contact-btn">
                <a href="tel:09634505726">Call 09634505726</a>
            </div>

        </nav>
    );
};
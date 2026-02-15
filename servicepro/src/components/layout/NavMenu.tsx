//import { NavLink } from "react-router-dom";
import "../../assets/css/NavMenu.css";
//import logo from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';

export const NavMenu: React.FC = () => {
    return (
        <nav className="navbar">
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



            <ul className="menu">
                <li><Link to="/products">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <div className="contact-btn">
                <a href="tel:09634505726">Call 09634505726</a>
            </div>
        </nav>
    );
};

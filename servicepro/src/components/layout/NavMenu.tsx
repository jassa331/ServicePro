//import { NavLink } from "react-router-dom";
import "../../assets/css/NavMenu.css";
//import logo from "../../assets/images/logo.png";
import { Link } from 'react-router-dom';

export const NavMenu: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logo-main">S.R &E</span>
                <span className="logo-sub"></span>
            </div>
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <div className="contact-btn">
                <a href="tel:08048606910">Call 08048606910</a>
            </div>
        </nav>
    );
};

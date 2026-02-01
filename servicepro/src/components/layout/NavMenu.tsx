import { NavLink } from "react-router-dom";
import "../../assets/css/MainLayout.css";
import logo from "../../assets/images/logo.png";

const NavMenu: React.FC = () => {
    return (
        <aside className="sidebar">

            {/* LOGO */}
            <div className="sidebar-logo">
                <img src={logo} alt="ServicePro Logo" />
            </div>

            {/* MENU */}
            <nav className="sidebar-menu">
                <NavLink to="/dashboard">🏠</NavLink>
                <NavLink to="/customers">👤</NavLink>
                <NavLink to="/jobs">🕐</NavLink>
                <NavLink to="/invoices">💰</NavLink>
                <NavLink to="/settings">🎓</NavLink>
            </nav>
        </aside>
    );
};

export default NavMenu;

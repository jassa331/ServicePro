import { NavLink } from "react-router-dom";

export default function NavMenu() {
    return (
        <nav>
            <NavLink to="/dashboard">Dashboard</NavLink> |{" "}
            <NavLink to="/customers">Customers</NavLink> |{" "}
            <NavLink to="/jobs">Jobs</NavLink> |{" "}
            <NavLink to="/invoices">Invoices</NavLink> |{" "}
            <NavLink to="/settings">Settings</NavLink>
        </nav>
    );
}

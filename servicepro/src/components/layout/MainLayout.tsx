import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar / Menu */}
            <aside style={{ width: "200px", background: "#eee", padding: "10px" }}>
                <h3>Menu</h3>
                <ul>
                    <li>Dashboard</li>
                    <li>Customers</li>
                    <li>Jobs</li>
                    <li>Invoices</li>
                </ul>
            </aside>

            {/* Page Content */}
            <main style={{ padding: "20px", flex: 1 }}>
                <Outlet />   {/* ?? THIS WAS MISSING */}
            </main>
        </div>
    );
}

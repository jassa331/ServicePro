import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import CustomersList from "../pages/customers/CustomersList";
import JobsList from "../pages/jobs/JobsList";
import InvoicesList from "../pages/invoices/InvoicesList";
import Settings from "../pages/Settings";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<CustomersList />} />
                    <Route path="/jobs" element={<JobsList />} />
                    <Route path="/invoices" element={<InvoicesList />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CustomersList from "../pages/customers/CustomersList";
import Dashboard from "../pages/dashboard/Dashboard";
import { AuthProvider } from "../context/AuthProvider";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { ProductPage } from "../pages/products/ProductPage";

export default function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Login page */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Main layout wrapper */}
                    <Route element={<MainLayout />}>
                        {/* Public route */}
                        <Route path="/products" element={<ProductPage />} />

                        {/* Protected routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/customers"
                            element={
                                <ProtectedRoute>
                                    <CustomersList />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

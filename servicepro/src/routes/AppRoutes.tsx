// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CustomersList from "../pages/customers/CustomersList";
import Dashboard from "../pages/dashboard/Dashboard";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ? Default redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Login page */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected area */}
                    <Route element={<MainLayout />}>
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                            //jassa
                        /*    jassa*/
                        />
                        {/*jasdsa*/}
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

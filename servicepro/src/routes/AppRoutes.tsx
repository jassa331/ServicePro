import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CustomersList from "../pages/customers/CustomersList";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { AuthProvider } from "../context/AuthProvider";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { ProductPage } from "../pages/products/ProductPage";
import Profile from "../pages/auth/Profile/profile";
import ProductCreate from "../pages/products/ProductCreate";
import { CategoryPage } from "../pages/products/CategoryPage";
import  Contact  from "../pages/products/contact";
import ContactList from "../pages/products/ContactList";




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
                   
                        {/* Public route */}
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contactList" element={<ContactList />} />

                    <Route
                        path="/admin/product-create"
                        element={
                            <ProtectedRoute>
                                <ProductCreate />
                            </ProtectedRoute>
                        }
                    />

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
                   
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

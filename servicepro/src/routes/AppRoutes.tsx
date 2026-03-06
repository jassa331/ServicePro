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
import ProductDetails from "../pages/products/ProductDetails";
import ProductListing from "../pages/products/ListingProduct";
import DeletedListingProduct from "../pages/products/DeletedListingProduct";
import InactiveProductDetails from "../pages/products/InactiveProductDetails";

import AdminProductDetails from "../pages/products/AdminProductDetails";


export default function AppRoutes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/products" replace />} />

                    {/* Login page */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Main layout wrapper */}
                   
                        {/* Public route */}
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contactList" element={<ContactList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />

                    <Route
                        path="/admin/product-create"
                        element={
                            <ProtectedRoute>
                                <ProductCreate />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/inactive-product/:id"
                        element={
                            <ProtectedRoute>
                                <InactiveProductDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/product/:id"
                        element={
                            <ProtectedRoute>
                                <AdminProductDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/deleted-listing-product"
                        element={
                            <ProtectedRoute>
                                <DeletedListingProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/product-listing"
                        element={
                            <ProtectedRoute>
                                <ProductListing />
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

// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react"; // type-only import
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { token } = useContext(AuthContext);

    if (!token) return <Navigate to="/login" replace />;

    return <>{children}</>;
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell
} from "recharts";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrls: string[];
}

export const Dashboard: React.FC = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [contactCount, setContactCount] = useState(0);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // ✅ Auth Check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    // ✅ Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<Product[]>(
                    "https://systemapi.runasp.net/api/Product"
                );
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ✅ Fetch Contacts
    const fetchContacts = async () => {
        try {
            const res = await axios.get(
                "https://systemapi.runasp.net/api/contact"
            );

            const newCount = res.data.length;

            setContactCount(prev => {
                if (prev !== 0 && newCount > prev) {
                    setHasNewNotification(true);
                }
                return newCount;
            });

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchContacts();
        const interval = setInterval(fetchContacts, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleBellClick = () => {
        setHasNewNotification(false);
        navigate("/contactList");
    };

    if (loading) return <div className="loader">Loading Dashboard...</div>;

    const totalProducts = products.length;
    const categories = Array.from(
        new Set(products.map(p => p.category))
    );

    // ✅ Line Chart Data
    const tradingData = [
        { name: "Products", value: totalProducts },
        { name: "Categories", value: categories.length }
    ];

    // ✅ Pie Chart Data
    const categoryData = categories.map(cat => ({
        name: cat,
        value: products.filter(p => p.category === cat).length
    }));

    const COLORS = [
        "#6366f1",
        "#f59e0b",
        "#10b981",
        "#ef4444",
        "#3b82f6",
        "#8b5cf6"
    ];

    return (
        <div className="dashboard-container">

            {/* Navbar */}
            <div className="dashboard-navbarr">
                <h1>Dashboard</h1>
                <ul className="menuu">
                    <li><Link to="/products">User-Portal</Link></li>
                    <li><Link to="/admin/product-create">Add-Product</Link></li>
                    <li><Link to="/product-listing">Manage-Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li onClick={handleLogout}>Logout</li>

                    <div className="notification" onClick={handleBellClick}>
                        <FaBell className="bell-icon" />
                        {hasNewNotification && (
                            <span className="notification-dot"></span>
                        )}
                    </div>
                </ul>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Total Products</h2>
                    <p>{totalProducts}</p>
                </div>

                <div className="card">
                    <h2>Total Categories</h2>
                    <p>{categories.length}</p>
                </div>

                <div className="card">
                    <h2>Total Contacts</h2>
                    <p>{contactCount}</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">

                {/* LEFT - Line Chart */}
                <div className="chart-box">
                    <h2>Analytics Overview</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={tradingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#6366f1"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* RIGHT - Pie Chart */}
                <div className="chart-box">
                    <h2>Category Distribution</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >
                                {categoryData.map((item, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* Latest Products */}
            <div className="latest-products">
                <h2>Latest Products</h2>
                <div className="products-grid">
                    {products.slice(0, 6).map(product => (
                        <div key={product.id} className="product-card">
                            {product.imageUrls[0] && (
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                />
                            )}
                            <h4>{product.name}</h4>
                            <p>₹{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
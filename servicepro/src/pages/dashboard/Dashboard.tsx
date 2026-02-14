import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import "../../assets/css/Dashboard.css";
import { Link } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrls: string[];
}

export const Dashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<Product[]>("https://systemapi.runasp.net/api/Product")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const totalProducts = products.length;
    const categories = Array.from(new Set(products.map(p => p.category)));

    // Category count for pie chart
    const categoryData = categories.map(cat => ({
        name: cat,
        value: products.filter(p => p.category === cat).length
    }));

    const COLORS = ["#f78b07", "#32baf0", "#f7ec16", "#4ce684", "#ab851f"];

    if (loading) return <div className="loader">Loading Dashboard...</div>;

    return (
        <div className="dashboard-container">

        
            {/* Navbar */}
            <div className="dashboard-navbar">
                <h1>Dashboard</h1>
            
                <ul className="menu">
                    <li><Link to="/products">User-Portal</Link></li>
                    <li><Link to="/admin/product-create">Add-Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/">Logout</Link></li>

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
            </div>

            {/* Pie Chart */}
            <div className="chart-section">
                <h2>Category Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Latest Products */}
            <div className="latest-products">
                <h2>Latest Products</h2>
                <div className="products-grid">
                    {products.slice(0, 6).map(product => (
                        <div key={product.id} className="product-card">
                            {product.imageUrls[0] && (
                                <img src={product.imageUrls[0]} alt={product.name} />
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

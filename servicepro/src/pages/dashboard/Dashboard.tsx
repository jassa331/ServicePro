import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/Dashboard.css";

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
        // Fetch all products to show some stats
        axios.get<Product[]>("https://systemapi.runasp.net/api/Product")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const totalProducts = products.length;
    const categories = Array.from(new Set(products.map(p => p.category)));

    if (loading) return <div className="loader">Loading Dashboard...</div>;

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

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

            <div className="category-overview">
                <h2>Categories</h2>
                <ul>
                    {categories.map(cat => (
                        <li key={cat}>{cat}</li>
                    ))}
                </ul>
            </div>

            <div className="latest-products">
                <h2>Latest Products</h2>
                <div className="products-grid">
                    {products.slice(0, 6).map(product => (
                        <div key={product.id} className="product-card">
                            {product.imageUrls[0] && (
                                <img src={product.imageUrls[0]} alt={product.name} width={100} />
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

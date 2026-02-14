import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/CategoryPage.css";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrls: string[];
}

export const CategoryPage: React.FC = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Map frontend URL slug → backend category
    const categoryMap: { [key: string]: string } = {
        cemment: "cemment",
        "tmt-bars": "TMT Bar",
        "binding-wire": "Binding Wire",
        "roofing-sheet": "Roofing Sheet",
        "ms-pipe": "cemment",
        "steel-angle": "Steel Angle",
    };

    useEffect(() => {
        if (!categoryName) return;

        const backendCategory = categoryMap[categoryName] || "";

        axios.get<Product[]>("https://systemapi.runasp.net/api/Product")
            .then(res => {
                const filtered = res.data.filter(
                    p => p.category.toLowerCase() === backendCategory.toLowerCase()
                );
                setProducts(filtered);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [categoryName]);

    if (loading) return <div className="loader">Loading Products...</div>;

    return (
        <div className="category-container">
            <h1 className="category-title">
                {categoryName?.toUpperCase()} PRODUCTS
            </h1>

            <div className="products-grid">
                {products.length === 0 ? (
                    <p className="no-products">No products found.</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} className="product-card">
                            {product.imageUrls?.length > 0 && (
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    className="product-image"
                                />
                            )}

                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="category">Category: {product.category}</p>
                                <p className="price">₹ {product.price}</p>
                                {product.description && <p className="description">{product.description}</p>}
                                <button className="buy-btn">View Details</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

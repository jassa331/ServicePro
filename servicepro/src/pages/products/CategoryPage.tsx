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

    // Store selected image per product
    const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});

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

                // Remove duplicate IDs (safety)
                const uniqueProducts = Array.from(
                    new Map(filtered.map(p => [p.id, p])).values()
                );

                setProducts(uniqueProducts);
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
                    products.map(product => {
                        const currentImage =
                            selectedImages[product.id] || product.imageUrls?.[0];

                        return (
                            <div key={product.id} className="amazon-card">

                                {/* LEFT THUMBNAILS */}
                                <div className="thumbnail-container">
                                    {product.imageUrls?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt="thumb"
                                            className={`thumbnail ${currentImage === img ? "active" : ""}`}
                                            onClick={() =>
                                                setSelectedImages(prev => ({
                                                    ...prev,
                                                    [product.id]: img
                                                }))
                                            }
                                        />
                                    ))}
                                </div>

                                {/* MAIN IMAGE */}
                                <div className="main-image-container">
                                    <img
                                        src={currentImage}
                                        alt={product.name}
                                        className="main-image"
                                    />
                                </div>

                                {/* PRODUCT INFO */}
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="category">{product.category}</p>
                                    <p className="price">₹ {product.price}</p>
                                    {product.description && (
                                        <p className="description">
                                            {product.description}
                                        </p>
                                    )}
                                    <button className="buy-btn">
                                        View Details
                                    </button>
                                </div>

                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

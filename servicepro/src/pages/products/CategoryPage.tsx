import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductImageGallery } from "../../components/common/ProductImageGallery";
import "../../assets/css/CategoryPage.css";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrls: string[];
}

interface CategoryResponse {
    category: string;
    products: Product[];
}

export const CategoryPage: React.FC = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<CategoryResponse[]>("https://localhost:7046/api/Product/by-category")
            .then(res => {
                const categoryData = res.data.find(
                    c => c.category.toLowerCase() === categoryName?.toLowerCase()
                );

                if (categoryData) {
                    setProducts(categoryData.products);
                } else {
                    setProducts([]);
                }
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
                            <div className="image-wrapper">
                                <ProductImageGallery
                                    images={product.imageUrls.map(url => ({
                                        src: url,
                                        caption: product.name
                                    }))}
                                />
                            </div>

                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="price">₹ {product.price}</p>
                                <button className="buy-btn">View Details</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

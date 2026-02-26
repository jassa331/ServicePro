import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/CategoryPage.css";
import { NavMenu } from '../../components/layout/NavMenu';
import { CategoryNavbar } from "../../components/layout/CategoryNavbar";

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
    const navigate = useNavigate();  

    // Store selected image per product
    const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});

    const categoryMap: { [key: string]: string } = {
        cemment: "cemment",
        "tmt-bars": "TMT Bar",
        "binding-wire": "Binding Wire",
        "roofing-sheet": "Roofing Sheet",
        "ms-pipe": "MS Pipe",
        "steel-angle": "Steel Angle",
    };
    const categories = [
        "TMT Bars",
        "cemment",
        "Binding Wire",
        "Roofing Sheet",
        "MS Pipe",
        "Steel Angle",
    ];
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
         <>
            <NavMenu />
            <CategoryNavbar categories={categories} />

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
                                    <button
                                        className="buy-btn"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>
                        );
                    })
                )}
                </div>
                <section className="company-info">
                    <div className="company-info-text">
                        <p>
                            We are the leading Authorized Wholesale Dealer of Binding Wire, Roofing Sheet, MS Square Pipe, Mild Steel Angle etc.
                            We are always focused towards presenting a supreme range of products for our customers.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/profile")}
                        >
                            + Read More
                        </button>
                    </div>

                    <div className="company-info-cards">
                        <div className="info-card">
                            <h4>Nature of Business</h4>
                            <p>Trader - Wholesaler/Distributor</p>
                        </div>
                        <div className="info-card">
                            <h4>Total Number of Employees</h4>
                            <p>11 to 25 People</p>
                        </div>
                        <div className="info-card">
                            <h4>GST Registration Date</h4>
                            <p>14-08-2017</p>
                        </div>
                        <div className="info-card">
                            <h4>Legal Status of Firm</h4>
                            <p>Partnership</p>
                        </div>
                        <div className="info-card">
                            <h4>Annual Turnover</h4>
                            <p>5 - 25 Cr</p>
                        </div>
                        <div className="info-card">
                            <h4>GST No</h4>
                            <p>09JFUPS2230L1ZL</p>
                        </div>
                    </div>

                    <div className="contact-us">
                        <p>Get in touch with us for best deals</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/contact")}
                        >
                            Contact Us
                        </button>                    </div>

                </section>
            </div>
        </>
    );
};

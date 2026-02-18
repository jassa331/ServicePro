import React from 'react';
import { NavMenu } from '../../components/layout/NavMenu';
import { ProductImageGallery } from '../../components/common/ProductImageGallery';
import "../../assets/css/ProductPage.css";
import { CategoryNavbar } from "../../components/layout/CategoryNavbar";
import { useNavigate } from "react-router-dom";

export const ProductPage: React.FC = () => {
    const productImages = [
        { src: "/tmt1.png", caption: "SR TMT Bars Supplier In Agra" },
        { src: "/myimage.png", caption: "TMT Steel Bars" },
        { src: "/SD.png", caption: "Cemment" },
    ];
    const categories = [
        "TMT Bars",
        "cemment",
        "Binding Wire",
        "Roofing Sheet",
        "MS Pipe",
        "Steel Angle",
    ];
    const navigate = useNavigate();

    const relatedPosts = [
        "Specification of Tata TMT Bars",
        "Advantages of Tata TMT Bars",
        "How to Store TMT Bars Properly",
        "Tempcore vs Micro-Alloying Technology",
    ];

    return (
        <>
            <NavMenu />
            <CategoryNavbar categories={categories} />

            {/* ===== Hero Banner ===== */}
            <section className="product-hero">
                <div className="hero-content">
                    <h1>Building Strength. Delivering Trust</h1>
                    <p>Welcome to S.R ENTERPRISE, your reliable partner for premium quality Cement, Iron & Steel products. We specialize in supplying top-grade construction materials that ensure strength, durability, and long-lasting performance for every project — from residential homes to large infrastructure developments.</p>
                </div>
                <div className="hero-image">
                    <img src="/ij.jpg" alt="Tata Tiscon TMT Bars" />
                </div>
            </section>

            {/* ===== Main Content ===== */}
            <main className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <span>Home</span> &gt; <span>Binding Wire</span> &gt; <span>TMT Bar</span>
                </nav>

                <div className="product-page">
                    {/* Product Gallery */}
                    <ProductImageGallery images={productImages} />

                    {/* Product Details */}
                    <div className="product-details">
                        <h2>Tata Tiscon TMT Bar</h2>
                        <p className="price">Rs 813 / Piece <span className="price-request">Price on Request</span></p>

                        <table className="product-specs">
                            <tbody>
                                <tr><td>Material</td><td>Mild Steel</td></tr>
                                <tr><td>Thickness/Diameter</td><td>1-2 inch, 2-3 inch</td></tr>
                                <tr><td>Application</td><td>Construction</td></tr>
                                <tr><td>Single Piece Length</td><td>12 Meter</td></tr>
                                <tr><td>Country of Origin</td><td>Made in India</td></tr>
                                <tr><td>Brand</td><td>TATA</td></tr>
                            </tbody>
                        </table>

                        <div className="product-actions">
                            <button className="btn btn-primary">Request a Call Back</button>
                            <button className="btn btn-secondary">Yes! I am Interested</button>
                        </div>
                    </div>
                </div>

                {/* Related / Info Section */}
                <aside className="related-posts">
                    <h3>Recent Posts & Info</h3>
                    <ul>
                        {relatedPosts.map((post, index) => (
                            <li key={index}>{post}</li>
                        ))}
                    </ul>
                </aside>
            </main>
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
                    <button className="btn btn-primary">Contact Us</button>
                </div>
            </section>
        </>
    );
};

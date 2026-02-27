import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/ProductDetails.css";
import { NavMenu } from '../../components/layout/NavMenu';
import { useNavigate } from "react-router-dom";
import { CategoryNavbar } from "../../components/layout/CategoryNavbar";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrls: string[];
}
const categories = [
    "TMT Bars",
    "cemment",
    "Binding Wire",
    "Roofing Sheet",
    "MS Pipe",
    "Steel Angle",
];
const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        axios.get("https://systemapi.runasp.net/api/Product/by-category")
            .then(res => {
                // API returns category wise
                const allProducts = res.data.flatMap((cat: any) => cat.products);

                const found = allProducts.find((p: Product) => p.id === id);

                setProduct(found);
                setSelectedImage(found?.imageUrls?.[0] || "");
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="loader">Loading...</div>;

    if (!product) return <div>Product Not Found</div>;

    return (
         <>
            <NavMenu />
            <CategoryNavbar categories={categories} />

        <div className="details-container">
            <div className="details-left">
                <div className="thumbnail-column">
                    {product.imageUrls?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            className={`thumb ${selectedImage === img ? "active" : ""}`}
                            onClick={() => setSelectedImage(img)}
                            alt="thumb"
                        />
                    ))}
                </div>

                <div className="main-image-box">
                    <img src={selectedImage} alt={product.name} />
                </div>
            </div>

            <div className="details-right">
                <h1 className="product-main-heading">Product Details</h1>

                <h2 className="product-name">{product.name}</h2>

                <table className="product-table">
                    <tbody>
                        <tr>
                            <th>Category</th>
                            <td>{product.category}</td>
                        </tr>

                        <tr>
                            <th>Price</th>
                            <td className="price-cell">₹ {product.price}</td>
                        </tr>

                        <tr>
                            <th>Description</th>
                            <td>{product.description}</td>
                        </tr>

                        <tr>
                            <th>Product ID</th>
                            <td>{product.id}</td>
                        </tr>
                    </tbody>
                    </table>
                    <button className="contactdetals-btn" onClick={() => navigate("/contact")}>
                        Contact Us
                    </button>

                    <button className="contactdetals-btn" onClick={() => navigate("/profile")}>
                        View Profile
                    </button>
            </div>

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
        </>
    );
};

export default ProductDetails;

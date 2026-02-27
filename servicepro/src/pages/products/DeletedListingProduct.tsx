import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/ListingProduct.css";
import { useNavigate, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrls: string[];
}

const DeletedListingProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [contactCount, setContactCount] = useState(0);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    const navigate = useNavigate();

    // 🔐 Token Check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    // 🔔 Fetch Contacts (Notification)
    const fetchContacts = async () => {
        try {
            const res = await axios.get("https://systemapi.runasp.net/api/contact");
            const newCount = res.data.length;

            if (contactCount !== 0 && newCount > contactCount) {
                setHasNewNotification(true);
            }

            setContactCount(newCount);
        } catch (error) {
            console.error("Contact fetch error:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
        const interval = setInterval(fetchContacts, 10000);
        return () => clearInterval(interval);
    }, [contactCount]);

    // 📦 Fetch Inactive Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await axios.get(
                    "https://localhost:7046/api/Product/Get-inactive-products",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProducts(res.data); // ✅ Directly set (no filtering needed)
            } catch (error: any) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [navigate]);

    // 🔔 Bell Click
    const handleBellClick = () => {
        setHasNewNotification(false);
        navigate("/contactList");
    };

    // 🚪 Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            {/* Navbar */}
            <div className="dashboard-navbar">
                <h1>S.R ENTERPRISE</h1>

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

            {/* Product Listing */}
            <div className="listing-container">
                <h2 className="page-title">Inactive Products</h2>

                <div className="product-grid">
                    {products.length === 0 ? (
                        <p style={{ textAlign: "center" }}>No inactive products found.</p>
                    ) : (
                        products.map((product) => (
                            <div
                                className="product-card"
                                key={product.id}
                                onClick={() =>
                                    navigate(`/admin/product/${product.id}`)
                                }
                            >
                                <div className="image-container">
                                    <img
                                        src={
                                            product.imageUrls &&
                                                product.imageUrls.length > 0
                                                ? product.imageUrls[0]
                                                : "/no-image.png"
                                        }
                                        alt={product.name}
                                    />
                                </div>

                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="category">{product.category}</p>
                                    <p className="price">
                                        ₹ {product.price.toLocaleString()}
                                    </p>
                                    <p className="desc">
                                        {product.description.length > 60
                                            ? product.description.substring(0, 60) + "..."
                                            : product.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default DeletedListingProduct;
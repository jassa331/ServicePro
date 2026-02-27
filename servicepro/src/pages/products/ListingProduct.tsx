import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/ListingProduct.css";
import { useNavigate, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

interface ProductImage {
    id: string;
    imageUrl: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    isActive: boolean;
    productImages: ProductImage[];
}

const ListingProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const [contactCount, setContactCount] = useState(0);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // Token check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    const fetchContacts = async () => {
        try {
            const res = await axios.get("https://systemapi.runasp.net/api/contact");
            const newCount = res.data.length;

            if (contactCount !== 0 && newCount > contactCount) {
                setHasNewNotification(true);
            }

            setContactCount(newCount);

        } catch (error) {
            console.error(error);
        }
    };
    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }
                const handleBellClick = () => {
                    navigate("/contactList");
                };
                const res = await axios.get(
                    "https://systemapi.runasp.net/api/Product/get-all-products-for=listing",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
               
                const activeProducts = res.data.filter(
                    (p: Product) => p.isActive
                );

                setProducts(activeProducts);
            } catch (error: any) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleBellClick = () => {
        setHasNewNotification(false);
        navigate("/contactList");
    };

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
                    <li><Link to="/admin/deleted-listing-product">InActive Products</Link></li>

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
                <h2 className="page-title">Our Products</h2>

                <div className="product-grid">
                    {products.map((product) => (
                        <div
                            className="product-card"
                            key={product.id}
                            onClick={() => navigate(`/admin/product/${product.id}`)}
                        >
                            <div className="image-container">
                                <img
                                    src={
                                        product.productImages.length > 0
                                            ? product.productImages[0].imageUrl
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
                    ))}
                </div>
            </div>
        </>
    );
};

export default ListingProduct;

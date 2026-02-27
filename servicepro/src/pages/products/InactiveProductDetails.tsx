import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/InactiveProductDetails.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaBell } from "react-icons/fa";
import Swal from "sweetalert2";

interface ProductImage {
    id: string;
    imageUrl: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    productImages: ProductImage[];
}

const InactiveProductDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // ================= FETCH INACTIVE PRODUCT =================
    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `https://systemapi.runasp.net/api/Product/get-inactive-product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProduct(res.data);
            setSelectedImage(res.data.productImages?.[0]?.imageUrl || "");
        } catch (error) {
            console.error(error);
            toast.error("Failed to load product.");
        } finally {
            setLoading(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    useEffect(() => {
        fetchProduct();
    }, [id]);
    const handleBellClick = () => {
        setHasNewNotification(false);
        navigate("/contactList");
    };
    // ================= RESTORE PRODUCT =================
    const handleRestore = async () => {
        const result = await Swal.fire({
            title: "Restore Product?",
            text: "This product will become active again!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#132910",
            cancelButtonColor: "#631a1a",
            confirmButtonText: "Yes, Restore",
        });

        if (!result.isConfirmed) return;

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `https://systemapi.runasp.net/api/Product/restore/${id}`,
                { isActive: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Product restored successfully 🎉");

            setTimeout(() => {
                navigate("/product-listing");
            }, 1000);

        } catch (error) {
            console.error(error);
            toast.error("Restore failed!");
        }
    };

    if (loading) return <div className="loader">Loading...</div>;
    if (!product) return <div>Product Not Found</div>;

    return (
        <>
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

            <ToastContainer position="top-right" autoClose={3000} />

            <div className="inactive-details-container">

                {/* LEFT SIDE */}
                <div className="inactive-left">

                    <div className="inactive-thumbs">
                        {product.productImages?.map((img) => (
                            <img
                                key={img.id}
                                src={img.imageUrl}
                                className={`inactive-thumb ${selectedImage === img.imageUrl ? "active" : ""}`}
                                onClick={() => setSelectedImage(img.imageUrl)}
                                alt="thumb"
                            />
                        ))}
                    </div>

                    <div className="inactive-main-img">
                        <img src={selectedImage} alt={product.name} />
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="inactive-right">

                    <h1>Inactive Product Details</h1>
                    <h2>{product.name}</h2>

                    <table className="inactive-table">
                        <tbody>
                            <tr>
                                <th>Category</th>
                                <td>{product.category}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>₹ {product.price}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{product.description}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td style={{ color: "red" }}>Inactive ❌</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="inactive-actions">
                        <button
                            className="restore-btn"
                            onClick={handleRestore}
                        >
                            Restore Product
                        </button>
                    </div>

                </div>

            </div>
        </>
    );
};

export default InactiveProductDetails;
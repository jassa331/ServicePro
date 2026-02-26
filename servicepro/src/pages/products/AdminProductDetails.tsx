import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AdminProductDetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBell } from "react-icons/fa";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrls: string[];
}
const AdminProductDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>("");

    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        isactive: true
    });

    // ================= GET PRODUCT =================
    const fetchProduct = async () => {
        try {
            const res = await axios.get("https://systemapi.runasp.net/api/Product/by-category");
            const allProducts = res.data.flatMap((cat: any) => cat.products);
            const found = allProducts.find((p: Product) => p.id === id);

            setProduct(found);
            setSelectedImage(found?.imageUrls?.[0] || "");

            if (found) {
                setFormData({
                    name: found.name,
                    description: found.description || "",
                    price: found.price,
                    category: found.category,
                    isactive: true
                });
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchProduct();
    }, [id]);

    // ================= HANDLE INPUT =================
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };
    const [hasNewNotification, setHasNewNotification] = useState(false);

    // ================= UPDATE PRODUCT =================
    const handleUpdate = async () => {
        try {
            const data = new FormData();
            data.append("Name", formData.name);
            data.append("Description", formData.description);
            data.append("Price", formData.price.toString());
            data.append("Category", formData.category);
            data.append("isactive", formData.isactive.toString());

            await axios.put(
                `https://systemapi.runasp.net/api/Product/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success("Product updated successfully!");
            setIsEdit(false);
            fetchProduct(); // refresh data

        } catch (error) {
            console.error(error);
            toast.error("Update failed!");        }
    };
    const handleBellClick = () => {
        setHasNewNotification(false);
        navigate("/contactList");
    };
    // ================= DELETE PRODUCT =================
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(
                `https://systemapi.runasp.net/api/Product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success("Product deleted successfully!");
            navigate("/admin/products");

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
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

                    <div className="notification" onClick={handleBellClick}>
                        <FaBell className="bell-icon" />
                        {hasNewNotification && (
                            <span className="notification-dot"></span>
                        )}
                    </div>
                </ul>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />

            <div className="admin-details-container">

                {/* LEFT SIDE */}
                <div className="admin-left">

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

                {/* RIGHT SIDE */}
                <div className="admin-right">

                    <h1>Admin Product Details</h1>

                    {!isEdit ? (
                        <>
                            <h2>{product.name}</h2>

                            <table className="admin-table">
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
                                        <th>Product ID</th>
                                        <td>{product.id}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className="edit-form">

                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                    )}

                    <div className="admin-actions">

                        {!isEdit ? (
                            <button
                                className="edit-btn"
                                onClick={() => setIsEdit(true)}
                            >
                                Edit
                            </button>
                        ) : (
                            <button
                                className="save-btn"
                                onClick={handleUpdate}
                            >
                                Save
                            </button>
                        )}

                        <button
                            className="delete-btn"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default AdminProductDetails;
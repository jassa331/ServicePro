import React, { useState, useEffect } from "react";
import "../../assets/css/product.css";
import { NavMenu } from '../../components/layout/NavMenu';
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductCreate: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        const updatedImages = [...images, ...files];

        if (updatedImages.length > 4) {
            alert("Maximum 4 images allowed!");
            return;
        }

        setImages(updatedImages);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);

        e.target.value = "";
    };
    const [hasNewNotification, setHasNewNotification] = useState(false);

   
    const removeImage = (index: number) => {
        const newImages = [...images];
        const newPreviews = [...previewUrls];

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        setImages(newImages);
        setPreviewUrls(newPreviews);
    };
    const handleBellClick = () => {
        setHasNewNotification(false);
        navigate("/contactList");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("category", category);

        images.forEach(img => formData.append("images", img));

        try {
            const response = await fetch("https://systemapi.runasp.net/api/Product", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            localStorage.getItem("token")
            fetch(`${import.meta.env.VITE_API_URL}/Product`)


            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error:", errorText);
                toast.error("Product creation failed!");
                return;
            }

            toast.success("Product Created Successfully!");
        } catch (error) {
            console.error("Network Error:", error);
            toast.error("Something went wrong!");
        }

        setLoading(false);
    };


    return (
            

        <div className="product-container">

            {/* ===== NAVBAR ===== */}
            <div className="dashboard-navbar">
                <h1>Create Product</h1>

                <ul className="menu">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/products">User-Portal</Link></li>
                    <li><Link to="/admin/product-create">Add-Product</Link></li>
                    <li><Link to="/product-listing">Manage-Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>



                    {/* ✅ Notification Properly Inside LI */}
                    <li className="notification-item" onClick={handleBellClick}>
                        <FaBell className="bell-icon" />
                        {hasNewNotification && (
                            <span className="notification-dot"></span>
                        )}
                    </li>
                </ul>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />

            {/* ===== PRODUCT CARD ===== */}
            <div className="product-card">
                <h2>Create New Product</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="cemment">Cemment</option>
                                <option value="TMT Bar">TMT Bar</option>
                                <option value="Binding Wire">Binding Wire</option>
                                <option value="Steel Angle">Steel Angle</option>
                                <option value="Roofing Sheet">Roofing Sheet</option>
                                <option value="MS Pipe">MS Pipe</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Upload Images (Max 4)</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <div className="preview-grid">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="preview-item">
                                    <img src={url} alt="preview" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        {loading ? "Uploading..." : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
        
  
);


};

export default ProductCreate;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/AdminProductDetails.css";
import { NavMenu } from "../../components/layout/NavMenu";

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

    useEffect(() => {
        if (!id) return;

        axios.get("https://systemapi.runasp.net/api/Product/by-category")
            .then(res => {
                const allProducts = res.data.flatMap((cat: any) => cat.products);
                const found = allProducts.find((p: Product) => p.id === id);
                setProduct(found);
                setSelectedImage(found?.imageUrls?.[0] || "");
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`https://systemapi.runasp.net/api/Product/${id}`);
            alert("Product deleted successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    if (loading) return <div className="loader">Loading...</div>;
    if (!product) return <div>Product Not Found</div>;

    return (
        <>
            <NavMenu />
            <div className="admin-details-container">

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

                <div className="admin-right">
                    <h1>Admin Product Details</h1>

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

                    <div className="admin-actions">
                        <button
                            className="edit-btn"
                            onClick={() => navigate(`/admin/product/edit/${product.id}`)}
                        >
                            Edit
                        </button>

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

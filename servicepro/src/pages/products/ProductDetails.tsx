import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/ProductDetails.css";
import { NavMenu } from '../../components/layout/NavMenu';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description?: string;
    imageUrls: string[];
}

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        axios.get("https://localhost:7046/api/Product/by-category")
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
            </div>

            </div>
        </>
    );
};

export default ProductDetails;

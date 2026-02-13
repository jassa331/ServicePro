import React, { useState } from "react";
import "../../assets/css/product.css";
import { NavMenu } from '../../components/layout/NavMenu';


const ProductCreate: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

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


    const removeImage = (index: number) => {
        const newImages = [...images];
        const newPreviews = [...previewUrls];

        newImages.splice(index, 1);
        newPreviews.splice(index, 1);

        setImages(newImages);
        setPreviewUrls(newPreviews);
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
                alert("Product creation failed!");
                return;
            }

            alert("Product Created Successfully!");
        } catch (error) {
            console.error("Network Error:", error);
            alert("Something went wrong!");
        }

        setLoading(false);
    };


    return (
               <>
            <NavMenu />

        <div className="product-container">
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
                                <option value="Kitchen">Cemment</option>
                                <option value="Bathroom">TMT Bar</option>
                                <option value="Furniture">Sheets</option>
                                <option value="Decor">Decor</option>
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
        
    </>
);


};

export default ProductCreate;

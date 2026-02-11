import React from 'react';
import "../../assets/css/ProductImageGallery.css";

interface ProductImageGalleryProps {
    images: { src: string; caption: string }[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
    return (
        <div className="gallery-container">
            <div className="gallery-track">
                {images.map((img, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={img.src} alt={img.caption} />
                        <div className="caption">{img.caption}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

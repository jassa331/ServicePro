import React, { useState } from 'react';

interface Props {
    images: string[];
}
 //jassa
export const ProductImageGallery: React.FC<Props> = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="product-gallery">
            <img src={mainImage} alt="Product" className="main-image" />
            <div className="thumbnails">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        className={img === mainImage ? 'active' : ''}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
        </div>
    );
};

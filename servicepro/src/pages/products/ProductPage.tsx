import React from 'react';
import { NavMenu } from '../../components/layout/NavMenu';
import { ProductImageGallery } from '../../components/common/ProductImageGallery';
import "../../assets/css/ProductPage.css"; // capital D


export const ProductPage: React.FC = () => {
    const productImages = [
        '/myimage.png',
        '/tmt1.png',
        
    ];


    return (
        <>
            <NavMenu />
            <main className="container">
                <nav className="breadcrumb">
                    <span>Home</span> &gt; <span>Binding Wire</span> &gt; <span>TMT Bar</span>
                </nav>

                <div className="product-page">
                    <ProductImageGallery images={productImages} />

                    <div className="product-details">
                        <h1>Tata Tiscon TMT Bar</h1>
                        <p className="price">Rs 813 / Piece <span className="price-request">Price on Request</span></p>

                        <table className="product-specs">
                            <tbody>
                                <tr><td>Material</td><td>Mild Steel</td></tr>
                                <tr><td>Thickness/Diameter</td><td>1-2 inch, 2-3 inch</td></tr>
                                <tr><td>Application</td><td>Construction</td></tr>
                                <tr><td>Single Piece Length</td><td>12 Meter</td></tr>
                                <tr><td>Country of Origin</td><td>Made in India</td></tr>
                                <tr><td>Brand</td><td>TATA</td></tr>
                            </tbody>
                        </table>

                        <div className="product-actions">
                            <button className="btn btn-primary">Request a Call Back</button>
                            <button className="btn btn-secondary">Yes! I am Interested</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

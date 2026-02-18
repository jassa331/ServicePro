import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/CategoryNavbar.css";

interface CategoryNavbarProps {
    categories: string[];
}

const toSlug = (text: string) => text.toLowerCase().replace(/\s+/g, "-");

export const CategoryNavbar: React.FC<CategoryNavbarProps> = ({ categories }) => {
    return (
        <div className="category-navbar">
            {categories.map((category, index) => (
                <Link
                    key={index}
                    to={`/category/${toSlug(category)}`}
                    className="category-btn"
                >
                    {category}
                </Link>
            ))}
        </div>
    );
};

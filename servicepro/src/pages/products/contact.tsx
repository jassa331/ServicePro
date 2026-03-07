import React, { useState } from "react";
import "../../assets/css/contact.css";
import { NavMenu } from "../../components/layout/NavMenu";
import { CategoryNavbar } from "../../components/layout/CategoryNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductContact() {
    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        product: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const categories = [
        "TMT Bars",
        "cemment",
        "Binding Wire",
        "Roofing Sheet",
        "MS Pipe",
        "Steel Angle",
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function validate() {
        if (!form.name.trim()) {
            toast.error("Name is required!");
            return false;
        }

        if (!form.phoneNumber.trim()) {
            toast.error("Phone number is required!");
            return false;
        }

        if (!form.email.trim()) {
            toast.error("Email is required!");
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            toast.error("Enter a valid email!");
            return false;
        }

        if (!form.product.trim()) {
            toast.error("Please select a product!");
            return false;
        }

        if (!form.message.trim()) {
            toast.error("Message is required!");
            return false;
        }

        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        setSubmitting(true);

        try {
            const res = await fetch("https://systemapi.runasp.net/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Server error");
            }

            toast.success("Message sent successfully!");

            // ✅ Reset full form (phone included)
            setForm({
                name: "",
                phoneNumber: "",
                email: "",
                product: "",
                message: "",
            });

        } catch (error) {
            toast.error(error.message || "Submission failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <NavMenu />
            <CategoryNavbar categories={categories} />

            <main className="contact-container">
                <ToastContainer position="top-right" autoClose={3000} />

                <form onSubmit={handleSubmit} className="contact-form">

                    <label>
                        Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="contact-input"
                            disabled={submitting}
                        />
                    </label>

                    <label>
                        Phone No
                        <input
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="contact-input"
                            disabled={submitting}
                        />
                    </label>

                    <label>
                        Email
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="contact-input"
                            disabled={submitting}
                        />
                    </label>

                    <label>
                        Product
                        <select
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            className="contact-input"
                            disabled={submitting}
                        >
                            <option value="">Select a product</option>
                            <option value="cemment">Cemment</option>
                            <option value="TMT Bar">TMT Bar</option>
                            <option value="Binding Wire">Binding Wire</option>
                            <option value="Steel Angle">Steel Angle</option>
                            <option value="Roofing Sheet">Roofing Sheet</option>
                        </select>
                    </label>

                    <label>
                        Message
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="contact-input"
                            style={{ minHeight: 120 }}
                            disabled={submitting}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="contact-button"
                    >
                        {submitting ? "Sending..." : "Send Message"}
                    </button>

                </form>
            </main>
        </>
    );
}
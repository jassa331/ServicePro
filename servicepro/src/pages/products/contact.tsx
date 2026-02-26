import React, { useState } from "react";
import "../../assets/css/contact.css";
import { NavMenu } from '../../components/layout/NavMenu';
import { CategoryNavbar } from "../../components/layout/CategoryNavbar";

/*
  Contact page for products
  - Simple contact form
  - Client-side validation
  - Sends JSON to /api/products/contact (placeholder)
*/

export default function ProductContact() {
    const [form, setForm] = useState({
        name: "",
        phoneNumber: "",  // ADD THIS
        email: "",
        product: "",
        message: "",
    });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
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
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Name is required.";
    if (!form.email.trim()) return "Email is required.";
    // simple email check
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.product.trim()) return "Please select a product.";
    if (!form.message.trim()) return "Message is required.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    try {
        const res = await fetch("https://systemapi.runasp.net/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Server error");
      }

      setStatus("success");
      setForm({ name: "", email: "", product: "", message: "" });
    } catch (err) {
      setErrorMessage(err.message || "Submission failed");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

    return (
         <>
            <NavMenu />
            <CategoryNavbar categories={categories} />

      <main className="contact-container">

          <form onSubmit={handleSubmit} className="contact-form">

              <label>
                  Name
                  <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="contact-input"
                      disabled={submitting}
                      required
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
                      required
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
                      required
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
                      required
                  >
                      <option value="">Select a product</option>
                      <option value="servicepro-core">ServicePro Core</option>
                      <option value="servicepro-analytics">ServicePro Analytics</option>
                      <option value="servicepro-mobile">ServicePro Mobile</option>
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
                      required
                  />
              </label>

              <button
                  type="submit"
                  disabled={submitting}
                  className="contact-button"
              >
                  {submitting ? "Sending..." : "Send message"}
              </button>

              {status === "success" && (
                  <p className="contact-success">
                      Your message has been sent. We'll be in touch.
                  </p>
              )}

              {status === "error" && (
                  <p className="contact-error">{errorMessage}</p>
              )}

          </form>
            </main>
      </>
  );
}


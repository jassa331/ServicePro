import React, { useState } from "react";

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
    <main style={styles.container}>
      <h1 style={styles.h1}>Contact about a product</h1>

      <form onSubmit={handleSubmit} style={styles.form} aria-labelledby="contact-heading">
        <label style={styles.label}>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            disabled={submitting}
            required
          />
              </label>
              <label style={styles.label}>
                  Phone No
                  <input
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      style={styles.input}
                      disabled={submitting}
                      required
                  />

              </label>

        <label style={styles.label}>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            disabled={submitting}
            required
          />
              </label>


        <label style={styles.label}>
          Product
          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            style={styles.input}
            disabled={submitting}
            required
          >
            <option value="">Select a product</option>
            <option value="servicepro-core">ServicePro Core</option>
            <option value="servicepro-analytics">ServicePro Analytics</option>
            <option value="servicepro-mobile">ServicePro Mobile</option>
          </select>
        </label>

        <label style={styles.label}>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            style={{ ...styles.input, minHeight: 120 }}
            disabled={submitting}
            required
          />
        </label>

        <div style={styles.actions}>
          <button type="submit" disabled={submitting} style={styles.button}>
            {submitting ? "Sending..." : "Send message"}
          </button>
        </div>

        {status === "success" && <p style={styles.success}>Your message has been sent. We'll be in touch.</p>}
        {status === "error" && <p role="alert" style={styles.error}>{errorMessage}</p>}
      </form>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 760,
    margin: "40px auto",
    padding: "0 16px",
    fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  },
  h1: {
    fontSize: 28,
    marginBottom: 20,
  },
  form: {
    display: "grid",
    gap: 12,
    background: "#fff",
    padding: 20,
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
    color: "#222",
  },
  input: {
    marginTop: 6,
    padding: "8px 10px",
    borderRadius: 4,
    border: "1px solid #cfcfcf",
    fontSize: 14,
    outline: "none",
  },
  actions: {
    marginTop: 6,
  },
  button: {
    background: "#0078d4",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  success: {
    color: "#107c10",
    marginTop: 8,
  },
  error: {
    color: "#a4262c",
    marginTop: 8,
  },
};
import React, { useEffect, useState } from "react";
import "../../assets/css/ContactList.css";

interface Contact {
    name: string;
    phoneNumber: string;
    email: string;
    product: string;
    message: string;
    createdAt: string;
}

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const downloadPdf = async () => {
        try {
            const response = await fetch(
                "https://systemapi.runasp.net/api/contact/download-pdf"
            );

            if (!response.ok) {
                throw new Error("Failed to download PDF");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "ContactRecords.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("Error downloading PDF");
        }
    };
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await fetch("https://systemapi.runasp.net/api/contact");
            if (!res.ok) throw new Error("Failed to fetch data");

            const data = await res.json();
            setContacts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-card">
                <div className="header-row">
                    <h2 className="contact-title">Customer Contact Notification</h2>

                    <button className="download-btn" onClick={downloadPdf}>
                        Download PDF
                    </button>
                </div>
                {loading && <p className="loading">Loading contacts...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && contacts.length > 0 && (
                    <div className="table-wrapper">
                        <table className="contact-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Product</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{contact.name}</td>
                                        <td>{contact.phoneNumber}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            <span className="product-badge">
                                                {contact.product}
                                            </span>
                                        </td>
                                        <td className="message-cell">
                                            {contact.message}
                                        </td>
                                        <td>
                                            {new Date(contact.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && contacts.length === 0 && (
                    <p className="no-data">No contacts found.</p>
                )}
            </div>
        </div>
    );
};

export default ContactList;

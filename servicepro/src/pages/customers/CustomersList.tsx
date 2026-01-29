import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customerService";
import type { CustomerDto } from "../../models/CustomerDto";
import { useNavigate } from "react-router-dom";

export default function CustomersList() {
    const [customers, setCustomers] = useState<CustomerDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCustomers()
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    // token expired or missing
                    setError("Session expired. Please login again.");
                    navigate("/login");
                } else {
                    setError("Failed to load customers");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading customers...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Customers</h2>
            {customers.map(c => (
                <div key={c.id}>
                    {c.id} - {c.name}
                </div>
            ))}
        </div>
    );
}

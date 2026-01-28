import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customerService";


export default function CustomersList() {
    return <h2>Customers Page</h2>;
}

export default function CustomersList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers().then(res => {
            setCustomers(res.data);
        });
    }, []);

    return (
        <div>
            <h2>Customers</h2>
            {customers.map(c => (
                <div key={c.id}>{c.name}</div>
            ))}
        </div>
    );
}

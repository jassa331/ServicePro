// src/services/customerService.ts
import axios from "axios";

export const getCustomers = async () => {
    const token = localStorage.getItem("token"); // get JWT from storage

    if (!token) throw new Error("No token found. Please login.");

    return axios.get("https://hoste.runasp.net/api/Customer", {
        headers: {
            Authorization: `Bearer ${token}`, // attach token
            "Content-Type": "application/json"
        },
    });
};

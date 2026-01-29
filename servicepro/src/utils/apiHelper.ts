import axios from "axios";

const api = axios.create({
    baseURL: "https://hoste.runasp.net/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

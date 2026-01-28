import api from "../utils/apiHelper";

export const getCustomers = () => {
    return api.get("/customers");
};

export const createCustomer = (data) => {
    return api.post("/customers", data);
};

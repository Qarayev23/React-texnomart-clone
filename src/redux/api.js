import axios from "axios";

const API = axios.create({ baseURL: "https://texnomart-db.herokuapp.com" });

export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);
export const getProductBysearch = (value) => API.get(`/products?q=${value}`);
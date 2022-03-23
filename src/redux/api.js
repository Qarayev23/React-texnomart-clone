import axios from "axios";

const API = axios.create({ baseURL: "https://texnomart-db.herokuapp.com" });

export const getProducts = () => API.get("/products");
export const getProductBysearch = (payload) => API.get(`/products?q=${payload}`);
export const filterByPrice = (payload) => API.get(`/products?_sort=price&_order=${payload}`);
export const getProduct = (id) => API.get(`/products/${id}`);

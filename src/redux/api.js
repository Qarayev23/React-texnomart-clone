import axios from "axios";

const API = axios.create({ baseURL: "https://texnomart-db.herokuapp.com" });

export const getProducts = (payload) => API.get(`/products${payload}`);
export const getProductBysearch = (payload) => API.get(`/products?q=${payload}`);
export const getProduct = (id) => API.get(`/products/${id}`);

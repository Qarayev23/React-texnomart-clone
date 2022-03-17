import axios from "axios";

const API = axios.create({ baseURL: "https://texnomart-db.herokuapp.com" });

export const getProducts = () => API.get(`/products`);
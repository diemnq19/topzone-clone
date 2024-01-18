import { sendDelete, sendGet, sendPost } from "./axios";

export const createProduct = (payload) => sendPost("/products", payload);
export const getBrand = () => sendGet("/brands");
export const getAllProductByType = (payload) => sendGet("/products", payload);
export const getProduct = (payload) => sendGet(`/products/${payload}`);
export const deleteProduct = (payload) => sendDelete(`/products/${payload}`)


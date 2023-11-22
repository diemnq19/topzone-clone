import { sendPost } from "./axios";

export const createProduct = (payload) => sendPost("/products", payload)
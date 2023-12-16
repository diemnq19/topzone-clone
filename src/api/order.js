import { sendPost } from "./axios";

export const createOrder = (payload) => sendPost("/orders", payload);

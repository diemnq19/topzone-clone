import { sendGet, sendPost } from "./axios";

export const createOrder = (payload) => sendPost("/orders", payload);
export const getUserOrder = (payload) => sendGet("/orders", payload);

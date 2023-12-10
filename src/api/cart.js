import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const addProduct = (payload) => sendPost("/shopping-carts", payload);
export const removeProduct = (payload) =>
  sendDelete(`/shopping-carts/${payload}`);
export const getUserCart = (payload) => sendGet(`/shopping-carts/${payload}`);
export const updateCart = (payload) =>
  sendPut(`/shopping-carts/${payload.id}`, payload);

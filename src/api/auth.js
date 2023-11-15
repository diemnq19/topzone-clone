import { sendPost } from "./axios";

export const login = (payload) => sendPost('/login', payload)
export const register = (payload) => sendPost('/register', payload)
import { sendPost, sendPut } from "./axios";

export const updateInfo = (payload, userId) => sendPut(`/user/${userId}`, payload)
export const updatePass = (payload) => sendPost('/updatepassword', payload)
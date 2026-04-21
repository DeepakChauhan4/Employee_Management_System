/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


export const api = axios.create({
    baseURL: (import.meta as any).env?.VITE_API_URL || "http://localhost:3000",
});

export const setAuthToken = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
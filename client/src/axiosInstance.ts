// axiosInstance.js
import axios from 'axios';

const baseURL = "https://movieranker-backend.onrender.com";

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    }
});

export default instance;
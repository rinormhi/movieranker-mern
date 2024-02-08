// axiosInstance.js
import axios from 'axios';

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:5001" : "https://movieranker-mern.onrender.com";

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    }
});

export default instance;
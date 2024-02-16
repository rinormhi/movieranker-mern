// axiosInstance.js
import axios from 'axios';

const baseURL = "http://localhost:5001";

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
    }
});

export default instance;
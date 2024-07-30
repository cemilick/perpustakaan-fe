import axios from "axios";
import { config } from "./config";

const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        "Content-type": "application/json",
      },
});

export default api;
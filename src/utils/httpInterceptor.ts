import axios from "axios";
import { getToken } from "../auth/handleJwtToken";

export default function configureInterceptor() {
    axios.interceptors.request.use(
        function(config) {
            const token = getToken();

            if(token && config && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        function(err) {
           return Promise.reject(err);
        }
    )
}
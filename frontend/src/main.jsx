import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const setupAxiosInterceptors = () => {
    axios.interceptors.request.use((config) => {
        // Retrieve the authentication token from cookies
        //   const authToken = getAuthTokenFromCookies();

        // Update the authentication header
        config.headers["Authorization"] = `${Cookies.get("_auth_type")} ${Cookies.get("_auth")}`;

        return config;
    });
};

setupAxiosInterceptors();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

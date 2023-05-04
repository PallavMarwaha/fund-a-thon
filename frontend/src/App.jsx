import { routes } from "./routes";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "react-auth-kit";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { PostDetail } from "./pages/PostDetail";
import { User } from "./pages/User";

import { AuthNotRequired } from "./utils/AuthNotRequired";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = `http://localhost:8000`;

function App() {
    return (
        <>
            {/* // Needs to be initialized once */}
            <ToastContainer />
            <AuthProvider
                authType={"cookie"}
                authName={"_auth"}
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === "https:"}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="account" element={<User />}>
                        <Route
                            path={routes.account.login}
                            element={
                                // <AuthNotRequired>
                                <Login />
                                // </AuthNotRequired>
                            }></Route>
                        <Route path={routes.account.signup} element={<SignUp />}></Route>
                    </Route>
                    <Route path="/detail" element={<PostDetail />}></Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;

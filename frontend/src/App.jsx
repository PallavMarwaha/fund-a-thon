import { routes } from "./routes";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider, RequireAuth, useIsAuthenticated } from "react-auth-kit";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { PostDetail } from "./pages/PostDetail";
import { User } from "./pages/User";
import { Fundraiser } from "./pages/Fundraiser";
import { CreateFundraiserForm } from "./pages/CreateFundraiserForm";

import { AuthNotRequired } from "./utils/AuthNotRequired";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = `http://localhost:8000`;

function App() {
    //https://github.com/react-auth-kit/react-auth-kit/issues/1023
    const PrivateRoute = ({ Component }) => {
        const isAuthenticated = useIsAuthenticated();
        const auth = isAuthenticated();
        return auth ? <Component /> : <Navigate to={routes.account.login} />;
    };

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
                    <Route path="fundraisers" element={<Fundraiser />}>
                        <Route path={routes.fundraisers.detail} element={<PostDetail />} />
                        <Route
                            path={routes.fundraisers.create}
                            element={<PrivateRoute Component={CreateFundraiserForm} />}
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;

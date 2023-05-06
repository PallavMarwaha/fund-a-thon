import { routes } from "./routes";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider, RequireAuth, useIsAuthenticated } from "react-auth-kit";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { FundraiserDetail } from "./pages/FundraiserDetail";
import { User } from "./pages/User";
import { Fundraiser } from "./pages/Fundraiser";
import { CreateFundraiserForm } from "./pages/CreateFundraiserForm";
import { About } from "./pages/About";

import { AuthNotRequired } from "./utils/AuthNotRequired";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { FundraisersList } from "./pages/FundraisersList";

axios.defaults.baseURL = `http://localhost:8000`;
// For Token authentication
axios.defaults.headers.post["Authorization"] = `${Cookies.get("_auth_type")} ${Cookies.get("_auth")}`;

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
                    <Route path={routes.about} element={<About />}></Route>
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
                        <Route index element={<FundraisersList />} />
                        <Route path={routes.fundraisers.detail} element={<FundraiserDetail />} />
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

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
import Dashboard from "./pages/Dashboard";

import { AuthNotRequired } from "./utils/AuthNotRequired";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { FundraisersList } from "./pages/FundraisersList";
import UserFundraisers from "./pages/UserFundraisers";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import UserFundraiserEdit from "./pages/UserFundraiserEdit";
// import fetcher from "./utils/fetcher";

axios.defaults.baseURL = `http://localhost:8000`;
// For Token authentication
axios.defaults.headers.post["Authorization"] = `${Cookies.get("_auth_type")} ${Cookies.get("_auth")}`;
axios.defaults.headers.get["Authorization"] = `${Cookies.get("_auth_type")} ${Cookies.get("_auth")}`;

const fetcher = (url) => axios.get(url).then((res) => res.data);

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
                        <Route path={routes.account.login} element={<Login />}></Route>
                        <Route path={routes.account.signup} element={<SignUp />}></Route>
                        <Route path={routes.account.dashboard.base} element={<PrivateRoute Component={Dashboard} />}>
                            <Route index element={<UserProfile fetcher={fetcher} />} />
                            <Route
                                path={routes.account.dashboard.fundraisers}
                                element={<UserFundraisers fetcher={fetcher} />}
                            />
                            <Route path={routes.account.dashboard.settings} element={<UserSettings />} />
                        </Route>
                    </Route>
                    <Route path="fundraisers" element={<Fundraiser />}>
                        <Route index element={<FundraisersList />} />
                        <Route path={routes.fundraisers.detail} element={<FundraiserDetail />} />
                        <Route
                            path={routes.fundraisers.create}
                            element={<PrivateRoute Component={CreateFundraiserForm} />}
                        />
                        <Route
                            path={routes.fundraisers.edit}
                            element={<PrivateRoute Component={UserFundraiserEdit} />}
                        />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </>
    );
}

export default App;

import { routes } from "../routes";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";

export function Login() {
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: "", password: "" });

    // Prevent logged in user from accessing this page.
    useEffect(() => {
        if (isAuthenticated() === true) {
            navigate(routes.home);
        }
    }, [isAuthenticated, navigate]);

    // Avoids split second flickering
    if (isAuthenticated()) {
        return null;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/accounts/login/", formData)
            .then((res) => {
                if (res.status) {
                    if (
                        signIn({
                            token: res.data.key,
                            expiresIn: 3600,
                            tokenType: "Token",
                            authState: res.data.user,
                        })
                    ) {
                        console.log("Success");
                    }
                } else {
                    throw new Error(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Please try again.");
            });
    };

    return (
        <section className="bg-gray-100 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log into your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="username@123"
                                    required
                                    onChange={(e) =>
                                        setFormData((prevState) => {
                                            return {
                                                ...prevState,
                                                username: e.target.value,
                                            };
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={(e) =>
                                        setFormData((prevState) => {
                                            return {
                                                ...prevState,
                                                password: e.target.value,
                                            };
                                        })
                                    }
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            checked
                                            disabled
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                {/* <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Forgot password?
                                </a> */}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet?
                                <Link
                                    to="/account/signup"
                                    className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

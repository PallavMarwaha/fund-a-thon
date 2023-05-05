import { routes } from "../routes";
import { useIsAuthenticated, useAuthUser, useSignOut } from "react-auth-kit";
import { Link } from "react-router-dom";

export function Navbar() {
    const userAuthDetails = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    return (
        <nav className="w-full py-4 bg-blue-800 shadow">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
                <nav>
                    <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
                        <li>
                            <Link className="hover:text-gray-200 hover:underline px-4" to={routes.home}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-gray-200 hover:underline px-4" to={routes.about}>
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* NOT Authenticated */}
                {!isAuthenticated() && (
                    <div className="flex items-center font-bold !no-underline !text-white pr-6">
                        <Link to={routes.account.login} className="p-2 rounded-md hover:bg-blue-600">
                            Login
                        </Link>
                        <Link to={routes.account.signup} className="ml-2 p-2 rounded-md hover:bg-blue-600">
                            Sign Up
                        </Link>
                    </div>
                )}

                {/* Authenticated */}
                {isAuthenticated() && (
                    <div className="flex items-center font-bold !no-underline !text-white pr-6">
                        <span>Hello, {userAuthDetails().first_name}</span>
                        <a
                            className="ml-8 p-2 rounded-md hover:bg-blue-600"
                            onClick={(e) => {
                                e.preventDefault();
                                signOut();
                            }}>
                            Sign Out
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
}

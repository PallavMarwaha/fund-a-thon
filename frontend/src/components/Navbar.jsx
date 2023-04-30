import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="w-full py-2 bg-blue-800 shadow">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
                <nav>
                    <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
                        <li>
                            <Link className="hover:text-gray-200 hover:underline px-4" to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <a className="hover:text-gray-200 hover:underline px-4" href="#">
                                About
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center text-lg !no-underline !text-white pr-6">
                    <Link to={"/login"} className="p-2 rounded-md hover:bg-blue-600">
                        Login
                    </Link>
                    <Link to="/signup" className="ml-2 p-2 rounded-md hover:bg-blue-600">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}

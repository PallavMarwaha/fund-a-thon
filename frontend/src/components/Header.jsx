import { Link } from "react-router-dom";
import { routes } from "../routes";

export function Header() {
    return (
        <header className="w-full container mx-auto">
            <div className="flex flex-col items-center py-12">
                <Link
                    to={routes.home}
                    className="font-bold text-center whitespace-nowrap text-gray-800 uppercase hover:text-gray-700 text-5xl">
                    Fund-a-Thon
                </Link>
                <p className="text-lg text-gray-600 text-center">A micro fundraiser website for college students!</p>
            </div>
        </header>
    );
}

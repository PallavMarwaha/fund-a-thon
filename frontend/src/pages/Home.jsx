import { Link } from "react-router-dom";
import { routes } from "../routes";
import { Loader } from "../components/Loader";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FundraiserArticle } from "../components/FundraiserArticle";
import dayjs from "dayjs";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    const apiUrl = `/fundraisers/featured/?page=${currentPage}`;
    const { data, error, isLoading } = useSWR(apiUrl, fetcher);

    useEffect(() => {
        if (error) {
            toast.error("Something went wrong while fetching the fundraisers.");
            return null;
        }
    }, [error]);

    if (isLoading) {
        return <Loader />;
    }

    const { results, next, previous } = data;

    return (
        <div className="bg-white font-family-karla">
            {/* Hero section */}
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-24 md:py-32 lg:flex lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Fund-a-Thon
                            <strong className="font-extrabold text-blue-800 block">Fundraising Platform</strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
                            A micro fundraising platform for <span className="border-b-4">college</span> students.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                                href="#featured">
                                See featured
                            </a>

                            <Link
                                className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-900 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                                to={routes.about}>
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured fundraisers */}
            <div className="container mx-auto flex flex-wrap py-6">
                <section className="w-full md:w-2/3 flex flex-col items-center px-3" id="featured">
                    {results.map((article) => {
                        const start_date = dayjs(article.start_date).format("DD MMMM, YYYY");
                        const end_date = dayjs(article.end_date).format("DD MMMM, YYYY");
                        const created_at = dayjs(article.created_at).format("DD MMMM, YYYY");
                        const url = `${routes.fundraisers.base}/${article.slug}`;
                        const data = {
                            ...article,
                            start_date,
                            end_date,
                            created_at,
                            url,
                        };
                        return <FundraiserArticle key={article.slug} {...data} />;
                    })}

                    <div className="flex items-center justify-between w-full py-8">
                        <button
                            onClick={previous ? () => setCurrentPage(currentPage - 1) : null}
                            type="button"
                            style={{ visibility: previous ? "visible" : "hidden" }}
                            className="h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">
                            <i className="fas fa-arrow-left mr-2"></i> Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button
                            onClick={next ? () => setCurrentPage(currentPage + 1) : null}
                            type="button"
                            style={{ visibility: next ? "visible" : "hidden" }}
                            className="ml-2 h-10 w-10 font-semibold text-gray-800 hover:text-gray-900 text-sm flex items-center justify-center ml-3">
                            Next <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </section>

                <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">About Us</p>
                        <p className="pb-2 text-justify">
                            With Fund-a-thon, students can create and customize their own fundraising page, set goals
                            and deadlines, and share their campaign with their networks to attract donations.
                        </p>
                        <Link
                            to={routes.about}
                            className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                            Get to know us
                        </Link>
                    </div>

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">Recent Projects</p>
                        <div className="grid grid-cols-3 gap-3">
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=2"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=3"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=4"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=5"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=6"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=7"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=8"
                            />
                            <img
                                className="hover:opacity-75"
                                src="https://source.unsplash.com/collection/1346951/150x150?sig=9"
                            />
                        </div>
                        <Link
                            to={routes.fundraisers.base}
                            className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                            See new fundraisers
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

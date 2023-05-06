import { useEffect, useRef, useState } from "react";
import { FundraiserArticle } from "../components/FundraiserArticle";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { routes } from "../routes";
import useSWR from "swr";
import { useNavigate } from "react-router";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function FundraisersList() {
    const [isComponentLoading, setIsComponentLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading } = useSWR(`/fundraisers/?page=${currentPage}`, fetcher);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsComponentLoading(false);
        }, 1000);
    }, []);

    // Handling data get error
    useEffect(() => {
        if (error) {
            toast.error("Something went wrong wrong. Please try again later.");
            navigate(routes.home);
        }
    }, [error, navigate]);

    // For page load animation
    if (isComponentLoading) {
        return <Loader />;
    }

    // For data load
    if (isLoading) {
        return <Loader />;
    }

    const { count, next, previous, results, total_pages } = data;

    return (
        <div className="p-10 mx-auto md:container">
            <Header />
            <div className="flex justify-between items-center">
                <button
                    type="button"
                    style={{ visibility: previous ? "visible" : "hidden" }}
                    className="p-2 bg-blue-700 text-white font-bold uppercase"
                    onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </button>

                <span className="font-bold uppercase text-lg">
                    Page <span className="text-white underline font-bold p-1 bg-blue-700 ml-1">{currentPage}</span> of{" "}
                    {total_pages}
                </span>

                <button
                    type="button"
                    style={{ visibility: next ? "visible" : "hidden" }}
                    className="p-2 ml-2 bg-blue-700 text-white font-bold uppercase"
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>
            <div className="mt-6 md:grid grid-cols-[1fr_1fr_1fr] gap-8">
                {results.map((result) => {
                    const start_date = dayjs(result.start_date).format("DD MMMM, YYYY");
                    const end_date = dayjs(result.end_date).format("DD MMMM, YYYY");
                    const created_at = dayjs(result.created_at).format("DD MMMM, YYYY");
                    const url = `${routes.fundraisers.base}/${result.slug}`;
                    const data = {
                        ...result,
                        start_date,
                        end_date,
                        created_at,
                        url,
                    };
                    return <FundraiserArticle key={result.slug} {...data} />;
                })}
            </div>
            <div className="text-center">
                {previous && (
                    <button type="button" className="p-4 bg-blue-400" onClick={() => setCurrentPage(currentPage - 1)}>
                        Previous
                    </button>
                )}

                {next && (
                    <button
                        type="button"
                        className="p-4 ml-2 bg-blue-400"
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { FundraiserArticle } from "../components/FundraiserArticle";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

export function FundraisersList() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-10 mx-auto md:container">
            <Header />
            <div className="mt-10 md:grid grid-cols-[2fr_1fr_1fr] gap-8">
                <FundraiserArticle />
                <FundraiserArticle />
                <FundraiserArticle />
                <FundraiserArticle />
                <FundraiserArticle />
                <FundraiserArticle />
                <FundraiserArticle />
            </div>
        </div>
    );
}

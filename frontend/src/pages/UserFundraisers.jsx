import { useEffect, useState } from "react";
import Select from "react-select";
import UserFundraisersTable from "../components/UserFundraisersTable";
import UserFundraisersGrid from "../components/UserFundraisersGrid";
import { Loader } from "../components/Loader";

import useSWR from "swr";
import { toast } from "react-toastify";
import useDebounce from "../hooks/useDebounce";

const toggleViewOptions = [
    {
        value: "table",
        label: "Table",
    },
    {
        value: "grid",
        label: "Grid",
    },
];

const apiUrl = "/accounts/dashboard/fundraisers";

export default function UserFundraisers({ fetcher }) {
    const [currentView, setCurrentView] = useState({
        value: "grid",
        label: "Grid",
    });
    const [fundraisersList, setFundraisersList] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 1000);

    const { data, error, isLoading } = useSWR(
        !debouncedSearch ? "/accounts/dashboard/fundraisers" : `/accounts/dashboard/fundraisers/?q=${debouncedSearch}`,
        fetcher
    );

    // Adding the fetched data to the state
    useEffect(() => {
        if (!data) return;

        setFundraisersList(data);
    }, [data]);

    // if (isLoading) {
    //     return <Loader />;
    // }

    if (error) {
        toast.error("Something went wrong while fetching your fundraisers.");
    }

    return (
        <div className="mx-auto w-9/12">
            <header className="w-full container mx-auto mt-10">
                <div className="flex flex-col items-center py-12">
                    <a className="font-bold text-center whitespace-nowrap text-gray-800 uppercase hover:text-gray-700 text-5xl">
                        Fundraisers
                    </a>
                    <p className="text-lg text-gray-600 text-center">Here are your recently created fundraisers.</p>
                </div>
            </header>

            {/* Search bar */}
            <div className="text-center px-6">
                <form>
                    <div className="md:flex">
                        <div className="md:w-6/12">
                            {/* <a className="uk-form-icon" href="#" data-uk-icon="icon: search"></a> */}
                            <input
                                className="uk-input"
                                type="text"
                                aria-label="Clickable icon"
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                        <div className="mt-2 md:mt-0 ml-auto flex">
                            <Select
                                options={toggleViewOptions}
                                defaultValue={{ label: "Grid", value: "grid" }}
                                value={currentView}
                                placeholder="Toggle view"
                                onChange={(action) => setCurrentView(action)}
                            />
                            <Select className="ml-1" placeholder="Sort by" />
                        </div>
                        {/* <button type="button" className="p-2 bg-blue-700 text-white hover:bg-blue-900 rounded">
                            Toggle table
                        </button> */}
                    </div>
                </form>
            </div>

            {currentView.value === "table" ? (
                <UserFundraisersTable data={fundraisersList} />
            ) : (
                <UserFundraisersGrid data={fundraisersList} />
            )}
        </div>
    );
}

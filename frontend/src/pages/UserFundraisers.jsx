import { useEffect, useState } from "react";
import Select from "react-select";
import UserFundraisersTable from "../components/UserFundraisersTable";
import UserFundraisersGrid from "../components/UserFundraisersGrid";
import { Loader } from "../components/Loader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { Link } from "react-router-dom";
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

const sortByOptions = [
    {
        label: "Name",
        value: "name",
    },
    {
        label: "Created At",
        value: "created_at",
    },
    {
        label: "Amount Raised",
        value: "amount_raised",
    },
    {
        label: "Amount Required",
        value: "amount_required",
    },
];

export default function UserFundraisers({ fetcher }) {
    const [currentView, setCurrentView] = useState({
        value: "grid",
        label: "Grid",
    });
    const [sortBy, setSortBy] = useState({
        label: "Name",
        value: "name",
    });

    const [fundraisersList, setFundraisersList] = useState([]);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 1000);

    const { data, error, isLoading } = useSWR(
        !debouncedSearch
            ? `/accounts/dashboard/fundraisers/?sort=${sortBy.value}`
            : `/accounts/dashboard/fundraisers/?q=${debouncedSearch}&sort=${sortBy.value}`,
        fetcher
    );

    const navigate = useNavigate();

    // Adding the fetched data to the state
    useEffect(() => {
        if (!data) return;

        setFundraisersList(data);
    }, [data]);

    // NOTE: This causes flickering while the search term is fetched
    // if (isLoading) {
    //     return <Loader />;
    // }

    if (error) {
        toast.error("Something went wrong while fetching your fundraisers.");
    }

    const deleteFundraiser = async (e, slug) => {
        const apiUrl = `/fundraisers/${slug}/delete/`;
        try {
            const response = await axios.post(apiUrl);

            toast.success("Fundraiser deleted successfully.");

            // Filters the state to re-render the new list
            setFundraisersList((prevState) => {
                return prevState.filter((fundraiser) => {
                    return fundraiser.slug !== slug;
                });
            });
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("You cannot delete this fundraiser. Please try again");
                return;
            }

            toast.error("Something went wrong deleting this fundraiser.");
        }
    };

    const onFundraiserDelete = (e, slug) => {
        confirmAlert({
            title: "Confirm delete",
            message: "Are you sure you want to delete this fundraiser?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteFundraiser(e, slug),
                },
                {
                    label: "No",
                    onClick: () => null,
                },
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    };

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
                            <Select
                                className="ml-1"
                                placeholder="Sort by"
                                options={sortByOptions}
                                value={sortBy}
                                onChange={(action) => setSortBy(action)}
                            />
                        </div>
                    </div>
                </form>
            </div>
            <Link
                to="/fundraisers/create"
                className="ml-1 p-4 font-medium text-primary-600 hover:underline dark:text-primary-500">
                + Create new
            </Link>

            {currentView.value === "table" ? (
                <UserFundraisersTable data={fundraisersList} onFundraiserDelete={onFundraiserDelete} />
            ) : (
                <UserFundraisersGrid data={fundraisersList} />
            )}
        </div>
    );
}

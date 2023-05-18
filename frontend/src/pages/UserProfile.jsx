import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { Loader } from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import FundraiserGridCard from "../components/FundraiserGridCard";
import formatDates from "../utils/formatDates";
import { useEffect } from "react";

export default function UserProfile() {
    const { data, error, isLoading } = useSWR("/accounts/dashboard/", fetcher);

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error("Something went wrong while fetching your profile details.");
            navigate(routes.home);
        }
    }, [error, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    let rupee = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        notation: "compact",
    });
    const total_funds_raised = rupee.format(data.total_funds_raised);

    return (
        <div className="mx-auto lg:w-8/12">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap justify-evenly">
                    <div className="md:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 mr-4">
                        <img
                            className="object-cover object-center w-full h-full min-w-full"
                            src="https://i.pravatar.cc/600"
                            alt="stats"
                            height={600}
                            width={300}
                        />
                    </div>
                    <div className="mt-8 md:mt-auto flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                        <div className="w-full sm:p-4 px-4 mb-6">
                            <h1 className="title-font font-medium text-center md:text-left text-2xl mb-2 text-gray-900">
                                {`${data.first_name} ${data.last_name}`}
                            </h1>
                            <div className="leading-relaxed">A member of Fund-a-Thon community.</div>
                            <div className="leading-relaxed mt-2">@{data.username}</div>
                            <div className="leading-relaxed mt-2">mail: {data.email}</div>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">{data.total_fundraisers}</h2>
                            <p className="leading-relaxed">Fundraisers</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">{total_funds_raised}</h2>
                            <p className="leading-relaxed">Funds</p>
                        </div>

                        {/* TODO: Add likes and comments for user profile */}
                        {/* <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
                            <p className="leading-relaxed">Likes</p>
                        </div>
                        <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                            <h2 className="title-font font-medium text-3xl text-gray-900">4</h2>
                            <p className="leading-relaxed">Comments</p>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Most popular fundraisers */}
            <section className="mb-8 px-6">
                <h2 className="mb-2 mt-0 text-2xl font-bold leading-tight text-black font-bold">
                    Your popular fundraisers
                </h2>
                <div className="lg:grid grid-cols-3 gap-3">
                    {data && data?.recent_fundraisers.length > 0
                        ? data?.recent_fundraisers.map((fundraiser) => {
                              return (
                                  <FundraiserGridCard
                                      key={fundraiser.slug}
                                      name={fundraiser.name}
                                      about={fundraiser.about}
                                      details={fundraiser.details}
                                      slug={fundraiser.slug}
                                      photos={fundraiser.photos}
                                      created_at={formatDates(fundraiser.created_at)}
                                  />
                              );
                          })
                        : null}
                </div>

                {data?.recent_fundraisers.length < 1 && (
                    <span className="text-lg">You don't seem to have any fundraisers.</span>
                )}
            </section>
        </div>
    );
}

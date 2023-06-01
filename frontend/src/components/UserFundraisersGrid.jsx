import formatDates from "../utils/formatDates";
import FundraiserGridCard from "./FundraiserGridCard";

function UserFundraisersGrid({ data }) {
    return (
        <div className="container p-6 mx-auto space-y-3 lg:space-y-0 lg:grid grid-cols-3 gap-3">
            {data.length === 0 ? (
                <span className="text-xl font-bold">You don't have any fundraisers</span>
            ) : (
                data.map((fundraiser) => {
                    return (
                        <FundraiserGridCard
                            name={fundraiser.name}
                            about={fundraiser.about}
                            details={fundraiser.details}
                            created_at={formatDates(fundraiser.created_at)}
                            slug={fundraiser.slug}
                            key={fundraiser.slug}
                            photos={fundraiser.photos}
                        />
                    );
                })
            )}
        </div>
    );
}

export default UserFundraisersGrid;

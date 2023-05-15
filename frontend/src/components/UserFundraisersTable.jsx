import formatDates from "../utils/formatDates";
import FundraiserTableRow from "./FundraiserTableRow";

function UserFundraisersTable({ data, onFundraiserDelete }) {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Amount Required</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Amount Raised</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data && data.length === 0 ? (
                        <span className="text-xl font-bold text-center">You don't seem to have any fundraisers</span>
                    ) : (
                        data.map((fundraiser) => {
                            return (
                                <FundraiserTableRow
                                    key={fundraiser.slug}
                                    slug={fundraiser.slug}
                                    name={fundraiser.name}
                                    created_at={formatDates(fundraiser.created_at)}
                                    amount_required={fundraiser.amount_required}
                                    amount_raised={fundraiser.amount_raised}
                                    onFundraiserDelete={onFundraiserDelete}
                                />
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserFundraisersTable;

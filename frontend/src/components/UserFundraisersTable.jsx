function UserFundraisersTable() {
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
                    <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <div className="overflow-hidden w-52">Robot fundraiser</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/2023</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        <td className="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                View
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                                Un-publish
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                                Delete
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <div className="overflow-hidden w-52">Robot fundraiser</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/2023</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        <td className="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                View
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                                Un-publish
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                                Delete
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <div className="overflow-hidden w-52">Robot fundraiser</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/2023</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                        <td className="whitespace-nowrap px-4 py-2">
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                View
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                                Un-publish
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                                Delete
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserFundraisersTable;

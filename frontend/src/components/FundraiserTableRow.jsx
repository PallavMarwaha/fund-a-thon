import React from "react";

function FundraiserTableRow({ name, created_at, amount_required, amount_raised }) {
    return (
        <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <div className="overflow-hidden w-52">{name}</div>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{created_at}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{amount_required}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{amount_raised}</td>
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
    );
}

export default FundraiserTableRow;

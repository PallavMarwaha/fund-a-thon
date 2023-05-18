import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";

function FundraiserTableRow({ name, created_at, amount_required, amount_raised, slug, onFundraiserDelete }) {
    return (
        <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <div className="overflow-hidden w-52">{name}</div>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{created_at}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{amount_required}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{amount_raised}</td>
            <td className="whitespace-nowrap px-4 py-2">
                <Link
                    to={`${routes.fundraisers.base}/${slug}`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    View
                </Link>
                <Link
                    to={`${routes.fundraisers.base}/${slug}/edit`}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 ml-1 text-xs font-medium text-white hover:bg-indigo-700">
                    Edit
                </Link>

                {/* TODO: Implement un-publish option */}
                {/* <a
                    href="#"
                    className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                    Un-publish
                </a> */}
                <button
                    type="button"
                    onClick={(e) => onFundraiserDelete(e, slug)}
                    className="inline-block rounded bg-indigo-600 px-4 py-2 ml-2 text-xs font-medium text-white hover:bg-indigo-700">
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default FundraiserTableRow;

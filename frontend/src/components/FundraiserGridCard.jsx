import { Link } from "react-router-dom";
import { routes } from "../routes";

function FundraiserGridCard({ name, about, details, slug, created_at }) {
    return (
        <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg h-fit">
            <img
                alt="Office"
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
                <time dateTime="2022-10-10" className="block text-xs text-gray-500">
                    {created_at}
                </time>

                <Link to={`${routes.fundraisers.base}/${slug}`}>
                    <h3 className="mt-0.5 text-lg text-gray-900">{name}</h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{about}</p>
            </div>
        </article>
    );
}

export default FundraiserGridCard;

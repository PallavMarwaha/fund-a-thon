import { Link } from "react-router-dom";
import truncate from "../utils/truncate";

export function FundraiserArticle(props) {
    const { name, details, about, photos, slug, start_date, end_date, created_at, url, user } = props;
    return (
        <article className="flex flex-col shadow my-4 text-justify hover:scale-105 transition ease-in-out ">
            <span className="hover:opacity-75">
                <img src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
            </span>
            <div className="bg-white flex flex-col justify-start p-6">
                <span className="text-blue-700 text-sm font-bold uppercase pb-4">
                    {start_date} - {end_date}
                </span>
                <Link to={url} className="text-3xl text-left font-bold hover:text-gray-700 pb-4">
                    {truncate(name, 50)}
                </Link>
                <p href="#" className="text-sm pb-3">
                    By
                    <Link to={url} className="font-semibold uppercase hover:text-gray-800">
                        : {`${user.first_name} ${user.last_name}`}
                    </Link>
                    , Published on {created_at}
                </p>
                <p className="pb-6">{truncate(about, 50)}</p>

                <Link to={url} className="uppercase text-gray-800 hover:text-black">
                    Continue Reading <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </article>
    );
}

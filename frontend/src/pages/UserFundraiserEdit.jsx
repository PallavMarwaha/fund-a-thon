import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import formatDates from "../utils/formatDates";
import { Loader } from "../components/Loader";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function UserFundraiserEdit() {
    const [fundraiserDetails, setFundraiserDetails] = useState({
        name: "",
        about: "",
        details: "",
        photos: "",
        other_photos: "",
    });
    const routeParams = useParams();
    const { fundraiserSlug } = routeParams;
    const apiUrl = `/fundraisers/${fundraiserSlug}/edit/`;
    const { data, error, isLoading } = useSWR(apiUrl, fetcher);

    useEffect(() => {
        if (!data) {
            return;
        }
        const { name, about, details } = data;

        setFundraiserDetails((prevState) => {
            return {
                ...prevState,
                name: name,
                about: about,
                details: details,
            };
        });
    }, [data, isLoading]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <>Something went wrong.</>;
    }

    const {
        name,
        about,
        details,
        amount_required,
        amount_raised,
        created_at,
        end_date,
        start_date,
        photos,
        comments,
        user,
    } = data;

    const startDate = formatDates(start_date);
    const endDate = formatDates(end_date);
    const createdAt = formatDates(created_at);
    const fundraiserProgress = (parseInt(amount_raised) / parseInt(amount_required)) * 100;

    const onChange = (e) => {
        if (e.target.type === "file" && e.target.name === "photos") {
            setFundraiserDetails((prevState) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.files[0],
                };
            });
            return;
        }

        if (e.target.type === "file" && e.target.name === "other_photos") {
            setFundraiserDetails((prevState) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.files,
                };
            });
            return;
        }

        setFundraiserDetails((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };
    return (
        <div className="mt-12">
            <div className="heading text-center text-gray-800 font-bold text-3xl uppercase m-6 lg:text-4xl">
                <span className="border-b font-mono">Update Fundraiser</span>
            </div>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <div>
                    <label htmlFor="name" className="inline-block text-xs text-white bg-gray-800 p-1 my-2">
                        Name
                    </label>
                    <span className="uk-margin-small-right" data-uk-icon="pencil"></span>
                    <input
                        className="title block w-full bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                        placeholder="Name"
                        type="text"
                        value={fundraiserDetails.name}
                        name="name"
                        id="name"
                        onChange={onChange}
                        max={120}
                        min={10}
                    />
                </div>

                <div>
                    <label htmlFor="about" className="inline-block text-xs text-white bg-gray-800 p-1 my-2">
                        About
                    </label>
                    <span className="uk-margin-small-right" data-uk-icon="pencil"></span>
                    <textarea
                        className="description block w-full bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                        placeholder="Write a short about for you fundraiser."
                        value={fundraiserDetails.about}
                        name="about"
                        id="about"
                        onChange={onChange}></textarea>
                </div>

                <div className="mt-4">
                    <label htmlFor="details" className="inline-block text-xs text-white bg-gray-800 p-1 my-2">
                        Details
                    </label>
                    <span className="uk-margin-small-right" data-uk-icon="pencil"></span>
                    <textarea
                        className="description block w-full bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
                        placeholder="Describe everything about this fundraiser here."
                        value={fundraiserDetails.details}
                        name="details"
                        id="details"
                        onChange={onChange}></textarea>
                </div>
                <hr className="m-4" />

                <div className="md:flex justify-between">
                    <div className="my-4">
                        <label htmlFor="photos" className="text-xs bg-gray-600 p-1 text-white font-medium mr-4">
                            Title image
                        </label>
                        <input
                            id="photos"
                            type="file"
                            name="photos"
                            accept="image/*"
                            className="block mt-4 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                            onChange={onChange}
                        />
                    </div>

                    <div className="my-4">
                        <label htmlFor="photos" className="text-xs bg-gray-600 p-1 text-white font-medium mr-4">
                            Other photos
                        </label>
                        <input
                            id="other_photos"
                            type="file"
                            name="other_photos"
                            multiple
                            accept="image/*"
                            className="block mt-4 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                            onChange={onChange}
                        />
                    </div>
                </div>

                <hr className="my-4" />

                {/* <!-- buttons --> */}
                <div className="buttons flex">
                    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
                        Cancel
                    </div>
                    <div className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-indigo-500">
                        Update
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserFundraiserEdit;

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import formatDates from "../utils/formatDates";
import { Loader } from "../components/Loader";
import { routes } from "../routes";
import { toast } from "react-toastify";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function UserFundraiserEdit() {
    const [fundraiserDetails, setFundraiserDetails] = useState({
        name: "",
        about: "",
        details: "",
        photos: "",
        other_photos: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const routeParams = useParams();
    const { fundraiserSlug } = routeParams;
    const apiUrl = `/fundraisers/${fundraiserSlug}/edit/`;
    const { data, error, isLoading } = useSWR(apiUrl, fetcher);

    const navigate = useNavigate();

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

    // For handling fetching and permission errors only.
    useEffect(() => {
        if (error) {
            if (error.response.status === 404) {
                toast.error("You don't have permission to edit this fundraiser");
            } else {
                toast.error("Something went wrong. Please try again later.");
            }

            navigate(routes.home);
        }
    }, [error, navigate]);

    if (isLoading) {
        return <Loader />;
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

    // Updates the state
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

    /**
     * Submits the data in the form of form data.
     */
    const onSubmit = async (e) => {
        e.preventDefault();

        // Reset the form errors
        setFormErrors({});

        const apiUrl = `/fundraisers/${fundraiserSlug}/edit/`;

        const formData = new FormData();

        formData.append("name", fundraiserDetails.name);
        formData.append("about", fundraiserDetails.about);
        formData.append("details", fundraiserDetails.details);
        formData.append("photos", fundraiserDetails.photos);

        // Spreading the FileList into array prevents unexpected form data
        for (const img in [...fundraiserDetails.other_photos]) {
            formData.append("other_photos", fundraiserDetails.other_photos[img]);
        }

        try {
            const response = await axios.post(apiUrl, formData);

            if (response) {
                toast.success("You've updated the fundraiser successfully.");
                navigate(routes.home);
            }
        } catch (error) {
            // Bad request
            if (error?.response?.status === 400) {
                toast.error("There are some errors in your form.");
                setFormErrors(error.response?.data);
            }
        }
    };

    return (
        <div className="mt-12">
            <div className="heading text-center text-gray-800 font-bold text-3xl uppercase m-6 lg:text-4xl">
                <span className="border-b font-mono">Update Fundraiser</span>
            </div>
            <form
                className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
                onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" className="inline-block text-xs text-white bg-gray-800 p-1 my-2">
                        Name
                    </label>
                    <span className="uk-margin-small-right" data-uk-icon="pencil"></span>
                    <input
                        className="title block w-full bg-gray-100 border border-gray-300 p-2 outline-none"
                        placeholder="Name"
                        type="text"
                        value={fundraiserDetails.name}
                        name="name"
                        id="name"
                        onChange={onChange}
                        max={120}
                        min={10}
                        required
                    />
                    {formErrors?.name?.map((error, idx) => {
                        return (
                            <span key={idx} className="text-xs text-red-900">
                                *{error}
                            </span>
                        );
                    })}
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
                        onChange={onChange}
                        required></textarea>
                    {formErrors?.about?.map((error, idx) => {
                        return (
                            <span key={idx} className="text-xs text-red-900">
                                *{error}
                            </span>
                        );
                    })}
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
                        onChange={onChange}
                        required></textarea>
                    {formErrors?.details?.map((error, idx) => {
                        return (
                            <span key={idx} className="text-xs text-red-900">
                                *{error}
                            </span>
                        );
                    })}
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
                        {formErrors?.photos?.map((error, idx) => {
                            return (
                                <span key={idx} className="text-xs text-red-900">
                                    *{error}
                                </span>
                            );
                        })}
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
                        {formErrors?.other_photos?.map((error, idx) => {
                            return (
                                <span key={idx} className="text-xs text-red-900">
                                    *{error}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <hr className="my-4" />

                {/* <!-- buttons --> */}
                <div className="buttons flex">
                    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
                        Cancel
                    </div>
                    <button
                        type="submit"
                        className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-indigo-500">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserFundraiserEdit;

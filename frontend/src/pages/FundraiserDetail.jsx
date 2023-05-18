import { useEffect, useState } from "react";
import { routes } from "../routes";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Loader } from "../components/Loader";
import FundraiserComment from "../components/FundraiserComment";
import useRazorpay from "react-razorpay";

export function FundraiserDetail() {
    const [fundraiserDetails, setFundraiserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const Razorpay = useRazorpay();

    const startDate = dayjs(fundraiserDetails?.start_date).format("DD MMMM, YYYY");
    const endDate = dayjs(fundraiserDetails?.end_date).format("DD MMMM, YYYY");
    const createdAt = dayjs(fundraiserDetails.created_at).format("DD MMMM, YYYY");
    const fundraiserProgess =
        (parseInt(fundraiserDetails.amount_raised) / parseInt(fundraiserDetails.amount_required)) * 100;

    const routeParams = useParams();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        return;
        const rzpPaymentForm = document.getElementById("razorpay");

        if (!rzpPaymentForm.hasChildNodes()) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/payment-button.js";
            script.async = true;
            script.dataset.payment_button_id = "pl_LnEqJqEV1hZ89E";
            script.dataset.slug = fundraiserDetails.slug;
            rzpPaymentForm.appendChild(script);
        }
    }, [isLoading]);

    // To check if the fundraiser exists on page load
    useEffect(() => {
        const getFundraiserDetails = async () => {
            try {
                const { fundraiserSlug } = routeParams;
                const apiUrl = `${routes.fundraisers.base}/${fundraiserSlug}/`;

                const response = await axios.get(apiUrl);

                setFundraiserDetails(response.data);

                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                // TODO: Redirect to homepage on error
                const { response } = error;
                setIsLoading(false);
                if (response?.status === 404) {
                    toast.error("Could not find the fundraiser. Please try again.");
                } else {
                    toast.error("Something went wrong. Please try again later.");
                }

                navigate(routes.home);
            }
        };

        getFundraiserDetails();
    }, [routeParams]);

    if (isLoading) {
        return <Loader />;
    }

    const createOrder = async (params) => {
        const apiUrl = "/fundraisers/create-order/";

        try {
            const response = await axios.post(apiUrl, {
                slug: fundraiserDetails.slug,
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleSuccessfulPayment = async (data) => {
        const apiUrl = "/fundraisers/callback-success/";

        try {
            const response = await axios.post(apiUrl, data);
            console.log(response);
            toast.success("Yohoo! You've successfully donated to this fundraiser.");
        } catch (error) {
            console.log(error);
            toast.error("Oops! Seems likes something went wrong with the payment. Please try again later.");
        }
    };

    // NOTE: This is only for testing purposes. DO NOT USE THIS IN PRODUCTION.
    const handlePayment = async (params) => {
        const order = await createOrder(params); //  Create order on your backend

        if (!order) return;

        const options = {
            key: "rzp_test_8qS1n6oZ6eUxcS", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Fund-a-thon",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                handleSuccessfulPayment({ ...response, slug: fundraiserDetails?.slug, order_id: order.receipt });
            },
            prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Razorpay Corporate Office",
                slug: fundraiserDetails.slug,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            toast.error("Oops! Seems likes something went wrong with the payment. Please try again later.");
        });

        rzp1.open();
    };

    return (
        <div className="md:container mx-auto flex flex-wrap py-6">
            <section className="w-full md:w-2/3 flex flex-col items-center px-3 mx-auto">
                <article className="flex flex-col shadow my-4">
                    <a href="#" className="hover:opacity-75">
                        <img src={"http://127.0.0.1:8000" + fundraiserDetails?.photos} width={1000} height={500} />
                    </a>
                    <div className="bg-white flex flex-col justify-start p-6">
                        <p href="#" className="text-blue-700 text-sm font-bold uppercase pb-4">
                            {startDate} - {endDate}
                        </p>
                        <a href="#" className="text-3xl uppercase font-bold hover:text-gray-700 pb-4">
                            {fundraiserDetails.name}
                        </a>
                        <p href="#" className="text-sm pb-8">
                            <a href="#" className="font-semibold uppercase hover:text-gray-800">
                                - {`${fundraiserDetails.user.first_name} ${fundraiserDetails.user.last_name}`}
                            </a>
                            , Published on {createdAt}
                        </p>
                        <h1 className="text-2xl font-bold pb-3">Introduction</h1>
                        <p className="pb-3 text-justify">{fundraiserDetails.about}</p>
                        <h1 className="text-2xl font-bold pb-3">Details</h1>
                        <p className="pb-3 text-justify">{fundraiserDetails.details} </p>

                        <hr className="m-4" />

                        <div className="">
                            <progress
                                id="js-progressbar"
                                className="uk-progress"
                                value={fundraiserProgess}
                                max={100}></progress>
                            <div className="flex justify-between">
                                <p className="pb-3">Rs.{fundraiserDetails.amount_raised}</p>
                                <p className="pb-3">Rs.{fundraiserDetails.amount_required}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="pb-3 uk-text-meta">(Funds raised)</p>
                                <p className="pb-3 uk-text-meta">(Funds required)</p>
                            </div>
                        </div>

                        <div>
                            <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                                <p className="text-xl font-semibold pb-5">Photos</p>
                                <div className="grid grid-cols-3 gap-3 justify-items-center">
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=2"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=3"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=4"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=5"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=6"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=7"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=8"
                                    />
                                    <img
                                        className="hover:opacity-75"
                                        src="https://source.unsplash.com/collection/1346951/150x150?sig=9"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="bg-blue-700 text-white font-bold rounded hover:bg-blue-500 p-2 m-2 w-1/4 mx-auto">
                        Donate Rs.200
                    </button>
                    <form id="razorpay"></form>
                </article>

                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                {/* Comments */}
                {fundraiserDetails.comments.length > 0 && (
                    <div>
                        <h2 className="font-bold text-2xl m-2">Comments ({fundraiserDetails.comments.length})</h2>

                        {fundraiserDetails.comments.map((comment, id) => {
                            const created_at = dayjs(comment.created_at).format("DD MMMM, YYYY");

                            const data = {
                                ...comment,
                                created_at,
                            };
                            return <FundraiserComment key={id} {...data} />;
                        })}
                    </div>
                )}

                {/* TODO: Add navigation and about author divs */}
                {/* Previous and Next links */}
                {/* <div className="w-full flex pt-6">
                    <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                        <p className="text-lg text-blue-800 font-bold flex items-center">
                            <i className="fas fa-arrow-left pr-1"></i> Previous
                        </p>
                        <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                    </a>
                    <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                        <p className="text-lg text-blue-800 font-bold flex items-center justify-end">
                            Next <i className="fas fa-arrow-right pl-1"></i>
                        </p>
                        <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                    </a>
                </div> */}

                {/* About the author */}
                {/* <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                    <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                        <img
                            src="https://source.unsplash.com/collection/1346951/150x150?sig=1"
                            className="rounded-full shadow h-32 w-32"
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center md:justify-start">
                        <p className="font-semibold text-2xl">David</p>
                        <p className="pt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero
                            suscipit suscipit eu eu urna.
                        </p>
                    </div>
                </div> */}
            </section>
        </div>
    );
}

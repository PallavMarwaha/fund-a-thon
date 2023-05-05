import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const INITIAL_DATA = {
    name: "",
    details: "",
    amount_required: "",
    photos: {},
    start_date: dayjs().format("YYYY-MM-DD"),
    end_date: dayjs().add(30, "days").format("YYYY-MM-DD"),
};
export function CreateFundraiserForm() {
    const [fundraiserInfo, setFundraiserInfo] = useState(INITIAL_DATA);

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    const todayDate = dayjs().format("YYYY-MM-DD");

    useEffect(() => {
        setFundraiserInfo((prevState) => {
            return {
                ...prevState,
                end_date: dayjs(fundraiserInfo.start_date).add(30, "days").format("YYYY-MM-DD"),
            };
        });
    }, [fundraiserInfo.start_date]);

    /**
     *  Updates the state for fundraiser form
     * @param {Object} e
     */
    const updateFundraiserInfo = (e) => {
        setFundraiserInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    /**
     * Updates the image in fundraiser form if valid
     * else toggles an error notification.
     * @param {*} e
     */
    const onPhotosChange = (e) => {
        const file = e.target.files[0];

        // Validate file type
        if (!["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(file.type)) {
            toast.error("Invalid file type");
            e.target.value = "";
            return;
        }

        setFundraiserInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: file,
            };
        });
    };

    return (
        <div className="mt-10 container mx-auto min-h-screen">
            <form className="mx-auto md:w-8/12">
                <fieldset className="uk-fieldset">
                    <legend className="uk-legend">Create a new fundraiser</legend>
                    <div className="uk-margin">
                        <label htmlFor="name" className="uk-label bg-blue-700 mb-2">
                            Name
                        </label>
                        <input
                            className="uk-input uk-form-large"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ex: Robotics fundraiser"
                            aria-label="Input"
                            onChange={updateFundraiserInfo}
                            required
                            minLength={10}
                        />
                    </div>

                    <div className="uk-margin">
                        <label htmlFor="details" className="uk-label mb-2 bg-blue-700">
                            Details
                        </label>
                        <textarea
                            className="uk-textarea uk-form-large"
                            rows="5"
                            placeholder="Textarea"
                            aria-label="Textarea"
                            name="details"
                            id="details"
                            onChange={updateFundraiserInfo}
                            required
                            minLength={20}
                        />
                    </div>

                    <div>
                        <h3 className="uk-label bg-blue-700 mb-2">Duration</h3>
                        <div className="flex justify-between">
                            <label
                                htmlFor="start_date"
                                className="cursor-pointer text-sm text-gray-600"
                                onClick={() => startDateRef.current.showPicker()}>
                                Start date
                            </label>
                            <label
                                htmlFor="end_date"
                                className="cursor-pointer text-sm text-gray-600"
                                onClick={() => endDateRef.current.showPicker()}>
                                End date
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <input
                                type="date"
                                className="p-2 border w-6/12 ml-auto"
                                name="start_date"
                                id="start_date"
                                min={todayDate}
                                value={fundraiserInfo.start_date}
                                ref={startDateRef}
                                onChange={updateFundraiserInfo}
                                required
                            />
                            <span className="border mx-2"></span>
                            <input
                                type="date"
                                className="p-2 border w-6/12"
                                name="end_date"
                                min={fundraiserInfo.start_date}
                                value={fundraiserInfo.end_date}
                                ref={endDateRef}
                                required
                                onChange={updateFundraiserInfo}
                            />
                        </div>
                    </div>

                    <div className="my-4">
                        <label htmlFor="formFile" className="uk-label bg-blue-700 mb-2">
                            Fundraiser photo
                        </label>
                        <input
                            className="p-6 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFile"
                            name="photos"
                            onChange={onPhotosChange}
                            required
                            accept="image/*"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button className="uk-button uk-button-default bg-gray-100 hover:bg-gray-200 text-md">
                            SUBMIT
                        </button>
                        <button
                            type="button"
                            className="inline-block bg-neutral-800 px-6 pb-2 pt-2.5 text-md uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]">
                            RESET
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

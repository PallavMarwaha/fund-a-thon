import { useState } from "react";

const INITIAL_DATA = {
    name: "",
    details: "",
    amount_required: "",
    start_data: new Date(),
    end_data: new Date(Date.now() + 3600 * 1000 * (24 * 30)),
};
export function CreateFundraiserForm() {
    const [fundraiserInfo, setFundraiserInfo] = useState(INITIAL_DATA);

    return (
        <div className="mt-10 container mx-auto">
            <form className="mx-auto md:w-8/12">
                <fieldset className="uk-fieldset">
                    <legend className="uk-legend">Legend</legend>
                    <div className="uk-margin">
                        <label htmlFor="name" className="uk-label mb-2">
                            Name
                        </label>
                        <input
                            className="uk-input uk-form-large"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ex: Robotics fundraiser"
                            aria-label="Input"
                        />
                    </div>

                    <div className="uk-margin">
                        <label htmlFor="name" className="uk-label mb-2">
                            Details
                        </label>
                        <textarea
                            className="uk-textarea uk-form-large"
                            rows="5"
                            placeholder="Textarea"
                            aria-label="Textarea"></textarea>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

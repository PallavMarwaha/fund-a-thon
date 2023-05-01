import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

export function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        college: {},
        password1: "",
        password2: "",
        isStudent: true,
    });

    useEffect(() => {
        if (!formData.isStudent) {
            setFormData((prevState) => {
                return {
                    ...prevState,
                    college: {},
                };
            });
        }
    }, [formData.isStudent]);

    const updateFormData = (event) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-2xl text-gray-600 mb-4">Sign-Up Form</h2>
                    {/* <p className="text-gray-500 mb-6">Form is mobile responsive. Give it a try.</p> */}

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5 md:flex justify-between">
                                            <div>
                                                <label htmlFor="firstName">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.firstName}
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.lastName}
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-5 md:flex justify-between">
                                            <div>
                                                <label htmlFor="email">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.email}
                                                    placeholder="email@domain.com"
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-5">
                                                <label htmlFor="username">Username</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.username}
                                                    placeholder="email@123"
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-5">
                                            <div>
                                                <label htmlFor="password1">Password</label>
                                                <input
                                                    type="password1"
                                                    name="password1"
                                                    id="password1"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.password1}
                                                    placeholder="**********"
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                            <div className="mt-2 md:col-span-5">
                                                <label htmlFor="password2">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    name="password2"
                                                    id="password2"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.password2}
                                                    placeholder="**********"
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2 md:col-span-5">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="isStudent"
                                                    id="isStudent"
                                                    className="form-checkbox"
                                                    onChange={updateFormData}
                                                    defaultChecked={formData.isStudent}
                                                />
                                                <label htmlFor="isStudent" className="ml-2">
                                                    I'm a student
                                                </label>
                                            </div>
                                        </div>
                                        {formData.isStudent && (
                                            <div className="md:col-span-2">
                                                <label htmlFor="country">College/University</label>
                                                <Select
                                                    options={options}
                                                    className="mt-2"
                                                    required={formData.isStudent ? true : false}
                                                    onChange={(choice) =>
                                                        setFormData((prevState) => {
                                                            return {
                                                                ...prevState,
                                                                college: choice,
                                                            };
                                                        })
                                                    }
                                                    name="college"
                                                />
                                            </div>
                                        )}
                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useIsAuthenticated } from "react-auth-kit";

export function SignUp() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        college_id: "",
        password: "",
        password2: "",
        is_student: true,
    });

    const [collegesList, setCollegesList] = useState([]);

    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    // Prevent logged in user from signing up.
    useEffect(() => {
        if (isAuthenticated() === true) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchCollegesList = async () => {
            const apiUrl = "/accounts/colleges/";

            try {
                const response = await axios.get(apiUrl);
                if (response.status !== 200) {
                    throw new Error();
                }
                const data = response.data;

                if (data) {
                    const modifiedCollegesList = data.map((college) => {
                        return {
                            value: college.id,
                            label: college.full_name,
                        };
                    });
                    setCollegesList([...modifiedCollegesList]);
                } else {
                    throw new Error();
                }
            } catch (error) {
                toast.error("Something went wrong with fetching the colleges list.");
            }
        };

        fetchCollegesList();
    }, []);

    // To reset college if not a student
    useEffect(() => {
        if (!formData.is_student) {
            setFormData((prevState) => {
                return {
                    ...prevState,
                    college_id: "",
                };
            });
        }
    }, [formData.is_student]);

    // Avoids split second flickering
    if (isAuthenticated()) {
        return null;
    }

    const updateFormData = (event) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
            };
        });
    };

    /**
     * Submits user form details for registration
     */
    const onSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (formData.password !== formData.password2) {
            toast.warn("Your passwords do not match!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        try {
            const apiUrl = "/accounts/register/";
            let response = await axios.post(apiUrl, formData);

            // Success
            toast.success("You've signed up successfully!", {
                position: toast.POSITION.TOP_RIGHT,
            });

            navigate("/");
        } catch (error) {
            if (error.response.status === 422) {
                const { data } = error.response;

                // data is an object with error name as keys and list of errors as values
                for (const key in data) {
                    data[key].map((error) => {
                        toast.error(error, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    });
                }
            } else {
                toast.error("Something went wrong. Please try again later.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-2xl text-gray-600 mb-4">Sign-Up Form</h2>

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
                                                <label htmlFor="first_name">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    id="first_name"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.first_name}
                                                    onChange={updateFormData}
                                                    required
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="last_name">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    id="last_name"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.last_name}
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
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                    value={formData.password}
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
                                                    name="is_student"
                                                    id="is_student"
                                                    className="form-checkbox"
                                                    onChange={updateFormData}
                                                    defaultChecked={formData.is_student}
                                                />
                                                <label htmlFor="is_student" className="ml-2">
                                                    I'm a student
                                                </label>
                                            </div>
                                        </div>
                                        {formData.is_student && (
                                            <div className="md:col-span-2">
                                                <label htmlFor="college">College/University</label>
                                                <Select
                                                    options={collegesList}
                                                    className="mt-2"
                                                    required={formData.is_student ? true : false}
                                                    onChange={(choice) =>
                                                        setFormData((prevState) => {
                                                            return {
                                                                ...prevState,
                                                                college_id: choice?.value,
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

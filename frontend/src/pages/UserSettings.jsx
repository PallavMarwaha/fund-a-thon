import { useState } from "react";
import { useAuthUser } from "react-auth-kit";

function UserSettings() {
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password1: "",
        password2: "",
    });

    const [errors, setErrors] = useState({});

    const auth = useAuthUser();
    const { first_name, last_name, username } = auth();

    const onChange = (e) => {
        setUserInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Client side validation

        // Username
        if (userInfo.username.length > 0 && userInfo.username.length < 5)
            setErrors((prevState) => {
                return {
                    ...prevState,
                    username: ["Your username must be longer than 5 letters"],
                };
            });

        // Passwords
        if (userInfo.password1 !== userInfo.password2) {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    password: ["Check your passwords again"],
                };
            });
        }
    };

    return (
        <div className="px-4 container mx-auto lg:w-6/12 flex justify-center items-center min-h-screen">
            <form className="w-full max-w-lg" onSubmit={onSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="flex justify-center m-4">
                        <img
                            className="object-cover object-center h-full w-7/12 md:w-4/12 rounded-full"
                            src="https://i.pravatar.cc/600"
                            alt="stats"
                            height={300}
                            width={300}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name">
                            First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder={first_name}
                            value={userInfo.first_name}
                            name="first_name"
                            onChange={onChange}
                            minLength={1}
                        />
                        {/* error message */}
                        {errors?.first_name &&
                            errors.first_name.map((error, idx) => {
                                return (
                                    <p key={idx} className="text-red-500 text-xs italic">
                                        {error}
                                    </p>
                                );
                            })}
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name">
                            Last Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            name="last_name"
                            placeholder={last_name}
                            value={userInfo.last_name}
                            onChange={onChange}
                            minLength={1}
                        />
                        {/* error message */}
                        {errors?.last_name &&
                            errors.last_name.map((error, idx) => {
                                return (
                                    <p key={idx} className="text-red-500 text-xs italic">
                                        {error}
                                    </p>
                                );
                            })}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password">
                            Username
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="text"
                            placeholder={username}
                            value={userInfo.username}
                            name="username"
                            minLength={1}
                            onChange={onChange}
                        />
                        <p className="text-gray-600 text-xs italic">Keep it short and simple</p>
                        {/* error message */}
                        {errors?.username &&
                            errors.username.map((error, idx) => {
                                return (
                                    <p key={idx} className="text-red-500 text-xs italic">
                                        {error}
                                    </p>
                                );
                            })}
                    </div>
                </div>

                {/* Password */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password">
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                            name="password1"
                            onChange={onChange}
                            value={userInfo.password1}
                            minLength={8}
                        />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>

                {/* Confirm password */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password">
                            Confirm Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                            name="password2"
                            onChange={onChange}
                            value={userInfo.password2}
                            minLength={8}
                        />
                        <p className="text-gray-600 text-xs italic">Make it match</p>
                        {/* error message */}
                        {errors?.password &&
                            errors.password.map((error, idx) => {
                                return (
                                    <p key={idx} className="text-red-500 text-xs italic">
                                        {error}
                                    </p>
                                );
                            })}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4 inherit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserSettings;

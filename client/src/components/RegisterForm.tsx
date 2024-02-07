import axios from "axios";
import { useContext, useState, FormEvent } from "react";
import { UserContext } from "../context/UserContext";

const RegisterForm = () => {

    const {
        uname, setUname,
        fname, setFname,
        lname, setLname,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        setRegistrationSucceed
    } = useContext(UserContext);

    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post("http://localhost:5001/api/users/register", {
            fname,
            lname,
            username: uname,
            email,
            password,
            confirmPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log(response);
                setRegistrationSucceed(true);
            })
            .catch(err => {
                setError(err.response.data.message)
                console.log(err);
            })
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for free
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={e => handleSubmit(e)} className="space-y-6" action="#" method="POST">
                        <div className="flex justify-between gap-5">
                            <div className="w-full">
                                <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <input
                                    onChange={e => setFname(e.target.value)}
                                    value={fname}
                                    className="w-full sm:text-sm sm:leading-6 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600" type="text" name="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <input
                                    onChange={e => setLname(e.target.value)}
                                    value={lname}
                                    className="w-full sm:text-sm sm:leading-6 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600" type="text" name="" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={e => setUname(e.target.value)}
                                    value={uname}
                                    id="uname"
                                    name="uname"
                                    type="text"
                                    autoComplete="Username"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="flex justify-between gap-5">
                            <div className="w-full">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="px-2 w-full sm:text-sm sm:leading-6 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <input
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="w-full sm:text-sm sm:leading-6 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="py-4 text-center text-red-600">
                        {error}
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
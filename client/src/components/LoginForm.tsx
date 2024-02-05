import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axiosInstance from '../axiosInstance';

const google = () => {
    window.open("/auth/google");
}

const LoginForm = () => {
    const {
        email, setEmail,
        password, setPassword,
        setIsAuthenticated,
        setUser
    } = useContext(UserContext);

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("/auth/login", {
            email: email,
            password: password
        },)
            .then(result => {
                if (result.data.success) {
                    setIsAuthenticated(true);
                    setUser(result.data.user);
                    setEmail("");
                    setPassword("");
                } else {
                    console.log("result.data.success is false.");
                }
            })
            .catch(err => {
                console.log("err:", err);
                setError(err.response.data.error)
            });
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
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={e => handleSubmit(e)} className="space-y-6" action="#" method="POST">
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            {/* <button onClick={google}>
                                Google
                            </button> */}
                            <div className="py-4 text-center text-red-600">


                            </div>
                        </div>
                    </form>
                    <div className="text-red-500 text-center">
                        {error}
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register now
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
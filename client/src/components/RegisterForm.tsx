import axiosInstance from '../axiosInstance';
import { useContext, useState, FormEvent } from "react";
import { UserContext } from "../context/UserContext";
import Button from "./common/Button";


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

        axiosInstance.post("/api/users/register", {
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
            <form onSubmit={e => handleSubmit(e)} className="space-y-6" action="#" method="POST">
                <div className="flex justify-between gap-5">
                    <div className="w-full">
                        <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                            Vorname
                        </label>
                        <input
                            onChange={e => setFname(e.target.value)}
                            value={fname}
                            type="text" name="" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                            Nachname
                        </label>
                        <input
                            onChange={e => setLname(e.target.value)}
                            value={lname}
                            type="text" name="" />
                    </div>
                </div>
                <div>
                    <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
                        Benutzername
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
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
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
                        />
                    </div>
                </div>


                <div className="flex justify-between gap-5">
                    <div className="w-full">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Passwort
                        </label>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required />
                    </div>
                    <div className="w-full">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Passwort bestätigen
                        </label>
                        <input
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="password"
                            required />
                    </div>
                </div>
                <Button
                    classes="w-full"
                    type="submit"
                    name="Registrieren"
                />
            </form>

            <div className="py-4 text-center text-red-600">
                {error}
            </div>

            <p className="text-center text-sm text-gray-500">
                Du hast bereits ein Konto?{' '}
                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Jetzt einloggen
                </a>
            </p>
        </>
    );
}

export default RegisterForm;
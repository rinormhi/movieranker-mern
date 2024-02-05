import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../axiosInstance';

export default function Header() {

    const { isAuthenticated, setIsAuthenticated, user } = useContext(UserContext);

    const logout = () => {
        axiosInstance.post("/auth/logout")
            .then(res => {
                console.log("Res:", res);
                setIsAuthenticated(false);
                console.log(isAuthenticated);
            })
            .catch(err => {
                console.log("Err", err);
            });
    }

    return (
        <header className='z-10'>
            <div className="wrapper max-w-7xl mx-auto py-10 flex justify-between items-center">
                <Link
                    className='z-10 logo text-xl font-bold'
                    to="/">MovieRanker
                </Link>
                <nav className='z-10 flex gap-5 font-semibold hover:text-red'>
                    <Link
                        to="/movies"
                    >
                        Movies
                    </Link>
                </nav>
                <div className="z-10">
                    {isAuthenticated ?
                        <>
                            <Link
                                to="my-profile"
                                className="z-10 -mx-3 block rounded-lg px-3text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {user.username}
                            </Link>
                            <Link
                                // onClick={logout}
                                to="/logout">
                                Log out
                            </Link>
                        </> :
                        <Link
                            to="/login"
                            className="z-10 -mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                            Log in
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}

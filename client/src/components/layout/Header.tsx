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
            <div className="wrapper max-w-7xl mx-auto py-6 flex justify-between items-center">
                <Link
                    className='z-10 logo text-2xl font-semibold text-color-primary hover:text-color-primary-hover transition-all'
                    to="/">MovieRanker
                </Link>
                <nav className='flex justify-between gap-4 z-10 font-semibold'>
                    <Link
                        className='text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                        to="/">
                        Home
                    </Link>
                    <Link
                        className='text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                        to="/movies">
                        Filme
                    </Link>
                    <Link
                        className='text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                        to="/">
                        Mitglieder
                    </Link>
                    {isAuthenticated ?
                        <>
                            <Link
                                className='text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                                to="my-profile"
                            >
                                {user.username}
                            </Link>
                            <Link
                                className='text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                                onClick={logout}
                                to="/">
                                Log out
                            </Link>
                        </> :
                        <Link
                            className='text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                            to="/login"
                        >
                            Log in
                        </Link>
                    }
                </nav>
            </div>
        </header>
    )
}

import axiosInstance from '../../axiosInstance';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'


const Nav = () => {

    const navigate = useNavigate();
    const { user, resetUser } = useContext(UserContext);
    const [query, setQuery] = useState("");
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setMenuOpen(false);


    }

    const logout = () => {
        axiosInstance.post("/auth/logout")
            .then(res => {
                console.log("Logged out");
                resetUser();
            })
            .catch(err => {
                console.log("logout-Error", err);
            });
    }

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            searchMovies();
        }
    }

    const searchMovies = () => {
        axiosInstance.get(`/api/movies/search/${query}`)
            .then((res) => {
                console.log(res);
                navigate("/results", {
                    state: {
                        results: res.data
                    }
                });
                setQuery("");
            })
    }

    return (
        <nav className='flex justify-between items-center gap-4 z-10 font-semibold'>
            <div onClick={toggleMenu} className='md:hidden burger-icon'>☰</div>
            <Link
                className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                to="/">
                Home
            </Link>
            <Link
                className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                to="/movies">
                Filme
            </Link>
            <Link
                className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                to="/">
                Mitglieder
            </Link>
            {user._id ?
                <>
                    <Link
                        className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                        to="my-profile"
                    >
                        {user.username}
                    </Link>
                    <Link
                        className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                        to="favorite-movies"
                    >
                        Favorites
                    </Link>
                    <Link
                        className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                        onClick={logout}
                        to="/">
                        Log out
                    </Link>
                </> :
                <Link
                    className='min-w-fit text-color-link hover:text-color-link-hover transition-all active:text-color-link-active'
                    to="/login"
                >
                    Log in
                </Link>
            }
            <input placeholder="Film suchen..." value={query} onChange={(e) => setQuery(e.target.value)} type='text' onKeyDown={handleKeyPress}></input>
        </nav>
    );
}

export default Nav;
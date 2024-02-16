// MovieCard.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MovieCardProps } from '../../../interfaces/MovieCardProps';
import { UserContext } from '../../../context/UserContext';
import axiosInstance from "../../../axiosInstance";
import { BookmarkAddSharp } from '@mui/icons-material';
import { BookmarkIcon } from '../Icons/Bookmark';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const { setUser, user } = useContext(UserContext);

    const addToLikes = (movieId: number) => {


        axiosInstance.get(`/api/users/addtofavorites/${movieId}`)
            .then((res) => {
                console.log("added to favorites");
                setUser(prevUser => ({
                    ...prevUser,
                    favoriteMovies: [...prevUser.favoriteMovies, movieId]
                }));
            })
            .catch((err) => {
                console.log("already in favorites");

                console.log(err);
            })
    }

    let poster_path = movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : `https://placehold.co/208x312/4c5a67/c6c8cd?text=Ohne%20Bild`

    return (
        <div className='relative w-[calc(33%-9px)] md:w-[calc(12.5%-19px)] z-0'>
            <div className='absolute w-8 h-8 -top-1 left-1' onClick={() => addToLikes(movie.id)}>
                <BookmarkIcon className={`absolute w-auto h-8 fill-color-dark-white transition-all duration-200 hover:fill-color-white cursor-pointer ${user.favoriteMovies.includes(movie.id) ? 'fill-color-primary' : ''}`} />
            </div>
            <Link to={`/movie/${movie.id}`}>
                <img
                    className='rounded-md width-full'
                    src={poster_path}
                    alt={movie.title}
                />
                <span className='rounded-3xl absolute bottom-2 right-2 bg-color-primary text-color-dark p-2 font-bold text-xs h-8 w-8 flex justify-center items-center'>{movie.vote_average.toFixed(1)}</span>
            </Link>
            {movie.id}
            {/* {user._id ? (
                <div className='flex bg-color-white bottom-0 w-full justify-between z-10'>
                    <div onClick={() => addToLikes(movie.id)} className={`text-center w-full ${user.favoriteMovies.includes(movie.id) ? 'text-color-primary' : 'text-color-dark'}`}>Like</div>
                    <div className='text-center w-full text-color-dark'>Dislike</div>
                </div>
            ) : ""
            } */}
        </div>
    );
};

export default MovieCard;

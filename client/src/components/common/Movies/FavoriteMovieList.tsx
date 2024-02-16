import { useEffect, useState } from "react";
import { Filter } from "../../../interfaces/Filter";
import { Movie } from "../../../interfaces/Movie";
import axiosInstance from "../../../axiosInstance";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const FavoriteMovieList: React.FC = () => {
    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axiosInstance.post(`/api/users/getFavorites/`, {
            favoriteMovies: user.favoriteMovies
        },)
            .then((res) => {
                setMovies(res.data.result)
            })
            .catch((err: Error) => {
                console.log(err);
            })
    },[])

    return (
        <>
            <div className='flex flex-wrap gap-[15px] md:gap-[21px] mt-4'>
                {
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div >
        </>
    )
}

export default FavoriteMovieList;
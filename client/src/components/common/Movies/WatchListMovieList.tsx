import { useEffect, useState } from "react";
import { Filter } from "../../../interfaces/Filter";
import { Movie } from "../../../interfaces/Movie";
import axiosInstance from "../../../axiosInstance";
import Button from "../Button";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const WatchListMovieList: React.FC = () => {

    const { user } = useContext(UserContext);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axiosInstance.post(`/api/users/getFavorites/`, {
            favoriteMovies: user.favoriteMovies
        },)
            .then((res) => {
                console.log(res);
                setMovies(res.data.result)
            })
            .catch((err: Error) => {
                console.log(err);
            })
    },[]);

    const loadMore = () => {
        axiosInstance.get("/api/movies/toprated")
            .then((res) => {
                setMovies(prevMovies => [...prevMovies, ...res.data.results]);
            })
            .catch((err: Error) => {
                console.log("/api/movies/toprated ERROR:", err);
            });
    }

    return (
        <>
            <div className='flex flex-wrap gap-[15px] md:gap-[21px] mt-4'>
                {
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
                <Button onclick={loadMore} name="Mehr anzeigen" classes='mx-auto w-full' />
            </div >
        </>
    )
}

export default WatchListMovieList;
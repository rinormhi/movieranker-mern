import { useEffect, useState } from "react";
import { Filter } from "../../../interfaces/Filter";
import { Movie } from "../../../interfaces/Movie";
import axiosInstance from "../../../axiosInstance";
import Button from "../Button";
import MovieCard from "./MovieCard";

const PopularMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axiosInstance
            .get("/api/movies/popularmovies")
            .then((res) => {
                setMovies(res.data.result);
            })
            .catch((err: Error) => {
                console.log("/api/movies/ ERROR: ", err);
            });
    }, []);
    

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

export default PopularMovies;
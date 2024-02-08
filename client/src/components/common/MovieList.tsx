import { useEffect, useState } from "react";
import { Filter } from "../../interfaces/Filter";
import { Movie } from "../../interfaces/Movie";
import axiosInstance from "../../axiosInstance";
import Button from "./Button";
import MovieCard from "./MovieCard";


const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filter, setFilter] = useState<Filter>({ genres: [], watchProviders: [] });

    useEffect(() => {
        axiosInstance
            .get("/api/movies/")
            .then((res) => {
                setMovies(res.data.results);
            })
            .catch((err: Error) => {
                console.log("/api/movies/ ERROR: ", err);
            });
    }, []);

    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter);
    }

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
            <div className='flex flex-wrap gap-[21px] mt-4'>
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

export default MovieList;
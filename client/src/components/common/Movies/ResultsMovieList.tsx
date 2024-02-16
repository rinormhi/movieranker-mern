import { useEffect, useState } from "react";
import { Filter } from "../../../interfaces/Filter";
import { Movie } from "../../../interfaces/Movie";
import axiosInstance from "../../../axiosInstance";
import Button from "../Button";
import MovieCard from "./MovieCard";
import { useLocation } from "react-router-dom";

const ResultsMovieList: React.FC = () => {

    const location = useLocation();
    const results = location.state?.results.result.results || [];
    console.log(results);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [filter, setFilter] = useState<Filter>({ genres: [], watchProviders: [], sortBy: "", page: 1 });

    useEffect(() => {
        setMovies(results);

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

export default ResultsMovieList;
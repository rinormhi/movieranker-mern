import { useContext, useEffect, useState } from "react";
import { Movie } from "../../../interfaces/Movie";
import axiosInstance from "../../../axiosInstance";
import MovieCard from "./MovieCard";
import { FilterContext } from "../../../context/FilterContext";
import Button from "../Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const { filter } = useContext(FilterContext);

    useEffect(() => {
        axiosInstance
            .post("/api/movies/", {
                filter: filter
            })
            .then((res) => {
                setMovies(res.data);
            })
            .catch((err: Error) => {
                console.log("/api/movies/ ERROR: ", err);
            });
    }, [filter]);

    const loadMore = () => {
        // setFilter({ ...filter, page: filter.page + 1 })
        // axiosInstance
        //     .post("/api/movies/loadmore", {
        //         filter: filter
        //     })
        //     .then((res) => {
        //         setMovies((oldMovies) => [...oldMovies, ...res.data.results]);
        //         console.log("Set new movies");
        //         console.log("Current-Filter:", filter);
        //     })
        //     .catch((err: Error) => {
        //         console.log("/api/movies/loadmore ERROR: ", err);
        //     });
    }

    return (
        <>
            <div className='flex flex-wrap gap-[15px] md:gap-[21px] mt-4'>
                {
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                }
            </div >
            <Button name="Mehr laden" classes="mt-4" onclick={loadMore}></Button>
        </>
    )
}

export default MovieList;
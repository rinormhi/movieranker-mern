import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../axiosInstance';



interface Movie {
    backdrop_path: string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    production_countries: Production_Country[];
}

interface Production_Country {
    iso_3166_1: string;
    name: string;
}

interface Genre {
    id: number;
    name: string;
}

interface Provider {
    flatrate?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    },
    buy?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    },
    rent?: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
    }
}

const Movie = () => {

    const { MOVIEID } = useParams<{ MOVIEID: string }>();

    const [movie, setMovie] = useState<Movie>();
    const [providers, setProviders] = useState<Provider>();

    useEffect(() => {
        axiosInstance
            .get(`/api/movies/details/${MOVIEID}`)
            .then((res) => {
                setMovie(res.data);
            })
            .catch((err) => {
                console.log("Error movie-details:" + err);
            });
        axiosInstance
            .get(`/api/movies/details/watchproviders/${MOVIEID}`)
            .then((res) => {
                setProviders(res.data);
            })
            .catch((err: Error) => {
                console.log("watchproviderserror-", err);
            })
    }, []);

    return (
        <>
            <div style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')` }} className="bg-cover bg-center h-[800px]">
                <div className="w-full h-full bg-gradient-to-b from-color-transparent to-color-dark"></div>
            </div>
            <div className="p-16 mt-[-200px] bg-color-dark h-[1000px] rounded-2xl wrapper w-full md:max-w-7xl mx-auto flex flex-row justify-between gap-[40px]">
                <div className="w-1/3">
                    <img src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`} className="rounded-t-xl w-full" />
                    <div className="options flex bg-color-dark-grey rounded-b-xl h-16 items-center text-center">
                        <div className="w-full flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <div className="text-xs">
                                Watchlist
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <div className="text-xs">
                                Gesehen
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            <div className="text-xs">
                                Like
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                            </svg>
                            <div className="text-xs">
                                Dislike
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="py-8 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Bewertung
                            </div>
                            <div className="text-sm font-light">
                                {movie?.vote_average.toFixed(2)} - ({movie?.vote_count})
                            </div>
                        </div>
                        <div className="py-8 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Genres
                            </div>
                            <div className="text-sm font-light">
                                {movie?.genres.map((genre => (
                                    <span key={genre.id}>{genre.name}, </span>
                                )))}
                            </div>
                        </div>
                        <div className="py-8 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Laufzeit
                            </div>
                            <div className="text-sm font-light">
                                {movie?.runtime} min.
                            </div>
                        </div>
                        <div className="py-8 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                FSK
                            </div>
                        </div>
                        <div className="py-8 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Produktionsland
                            </div>
                            <div className="text-sm font-light">
                                {movie?.production_countries.map((production_country) => (
                                    <span key={production_country.iso_3166_1}>{production_country.name}, </span>
                                ))}
                            </div>
                        </div>
                        <div className="py-8 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Regisseur
                            </div>
                            <div className="text-sm font-light">
                                {movie?.vote_average.toFixed(2)} - ({movie?.vote_count})
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-2/3">
                    <div className="flex items-end gap-4">
                        <h2>{movie?.title}</h2>
                        <div className="text-color-dark-white text-2xl">{movie?.release_date ? "(" + new Date(movie.release_date).getFullYear() + ")" : null}</div>
                    </div>
                    <div className="text-color-primary uppercase mt-3 text-md font-bold">{movie?.tagline}</div>
                    <div className="mt-3">
                        <div className="uppercase text-color-subtitle font-bold">Verfügbar auf:</div>
                        <div></div>
                    </div>
                    <div className="mt-3">
                        {movie?.overview}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Movie;
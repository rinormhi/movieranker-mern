import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from '../axiosInstance';
import { Movie } from "../interfaces/Movie";
import { Provider } from "../interfaces/Provider";
import { BookmarkIcon } from '../components/common/Icons/Bookmark';
import { HeartIcon } from '../components/common/Icons/Heart';
import Providers from "../components/common/Provider/Providers";

const MoviePage = () => {

    const { MOVIEID } = useParams<{ MOVIEID: string }>();
    const [movie, setMovie] = useState<Movie | undefined>(undefined);
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
            });
        axiosInstance
            .get(`/api/movies/details/trailer/${MOVIEID}`)
            .then((res) => {
                if (res.data[0] != null) {
                    setMovie((prevMovie) => ({
                        ...prevMovie!,
                        trailer_key: res.data[0].key
                    }));
                }
            })
            .catch((err: Error) => {
                console.log(err);
            })
    }, [MOVIEID]);


    return (
        <>
            <div style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')` }} className="rounded-xl bg-cover bg-center md:h-[800px] h-[350px]">
                <div className="w-full h-full bg-gradient-to-b from-color-transparent to-color-dark"></div>
            </div>
            <div className="py-8 md:p-16 mt-[-20px] md:mt-[-200px] bg-color-dark h-[1000px] md:rounded-2xl wrapper w-full md:max-w-7xl mx-auto flex flex-row justify-between gap-[40px]">
                <div className="w-1/3">
                    <img src={`https://image.tmdb.org/t/p/w342/${movie?.poster_path}`} className="rounded-t-xl w-full" />
                    <div className="options flex bg-color-dark-grey rounded-b-xl h-16 items-center text-center">
                        <div className="w-full flex flex-col items-center gap-1">
                            <BookmarkIcon className="h-6" />
                            <div className="text-xs">
                                Speichern
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
                            <HeartIcon className="h-6" />
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
                    <div className="py-4">
                        <div className="py-4 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Bewertung
                            </div>
                            <div className="text-sm font-light">
                                {movie?.vote_average.toFixed(2)} - ({movie?.vote_count})
                            </div>
                        </div>
                        <div className="py-4 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Genres
                            </div>
                            <div className="text-sm font-light">
                                {movie?.genres.map((genre => (
                                    <span key={genre.id}>{genre.name}, </span>
                                )))}
                            </div>
                        </div>
                        <div className="py-4 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                Laufzeit
                            </div>
                            <div className="text-sm font-light">
                                {movie?.runtime} min.
                            </div>
                        </div>
                        <div className="py-4 flex flex-col gap-2 border-b border-color-input-bg">
                            <div className="uppercase text-color-subtitle font-bold">
                                FSK
                            </div>
                        </div>
                        <div className="py-4 flex flex-col gap-2 border-b border-color-input-bg">
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
                        <div className="ring p-5 my-4 rounded-xl ring-color-dark-hover">
                            <span className="text-color-body text-sm font-semibold uppercase">Kaufen</span>
                            <Providers providers={providers} type={"buy"} />
                        </div>
                        <div className="ring p-5 my-4 rounded-xl ring-color-dark-hover">
                            <span className="text-color-body text-sm font-semibold uppercase">Leihen</span>
                            <Providers providers={providers} type={"rent"} />
                        </div>
                        <div className="ring p-5 my-4 rounded-xl ring-color-dark-hover">
                            <span className="text-color-body text-sm font-semibold uppercase">Streamen</span>
                            <Providers providers={providers} type={"flatrate"} />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="uppercase text-color-subtitle font-bold mt-8 mb-2">Worum gehts?</div>
                        {movie?.overview}
                    </div>
                    <div className="">
                        <div className="uppercase text-color-subtitle font-bold mt-8 mb-2">Trailer</div>
                        <iframe className="aspect-video	w-full" src={`https://www.youtube.com/embed/${movie?.trailer_key}`} allowFullScreen></iframe>
                    </div>
                </div>
            </div >
        </>
    );
}

export default MoviePage;
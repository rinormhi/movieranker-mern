import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import Dropdown from '../components/common/Dropdown';
import ProviderList from "../components/common/ProviderList";
import { WatchProvider } from '../interfaces/WatchProvider'
import MovieList from '../components/common/MovieList';

const Movies: React.FC = () => {

    const [providers, setProviders] = useState<WatchProvider[]>();

    useEffect(() => {
        axiosInstance
            .get("/api/movies/getwatchproviders")
            .then((res => {
                setProviders(res.data);
            }))
            .catch((err: Error) => {
                console.log("/api/movies/getwatchproviders ERROR:", err);
            })
    }, [])

    return (
        <>
            <div className="wrapper w-full md:max-w-7xl mx-auto flex flex-col justify-between ">
                <h5 className="mb-2 ">Willkommen bei MovieRanker</h5>
                <div className="flex flex-col gap-2">
                    <p className="text-color-dark-white ">
                        Schön, dass du hier bist! Viel Spaß beim Stöbern und Entdecken deiner Lieblingsfilme und Serien zum Streamen.
                        Finde heraus, was du bei deinen Lieblings-Streaming-Diensten anschauen kannst.
                    </p>
                    <p className="text-color-dark-white ">
                        Welche Filme und Serien sind neu im Angebot? Wo finde ich die beliebtesten Filme und welche Serien sind gerade angesagt ?
                        MovieRanker stellt in dieser Übersicht dar, welche Filme und Serien du online anschauen kannst. Dabei zeigen wir dir ausschließlich legale Optionen. Du wirst also alle Möglichkeiten gezeigt bekommen, wo du deinen Film oder deine Lieblingsserie online kaufen, leihen oder bei welchem Anbieter du sie streamen kannst. Dazu haben wir effektive Filter-Möglichkeiten entwickelt: Du kannst deine Lieblings-Genres einfach auswählen und nach Erscheinungsjahr filtern.
                        Oder suche direkt nach Filmen und Serien, um herauszufinden, wo du sie legal online anschauen kannst.
                    </p>
                    <p className="text-color-dark-white ">
                        Mit MovieRaker kannst du auch entdecken, welche neuen Filme und Serien du in Deutschland bald streamen kannst. Du hast auch die Möglichkeit mithilfe von Filtern nach demnächst verfügbaren Filmen und Serien separat zu suchen.
                    </p>
                </div>
                <ProviderList providers={providers} />
                <div className="filter-options mt-4 flex gap-8 justify-between text-color-dark-white items-center">
                    <div className="contentType flex gap-4 text-2xl text-color-dark-white">
                        <div className="contentTypeOption font-extrabold">
                            Alle
                        </div>
                        <div className="contentTypeOption text-color-dark-white">
                            Filme
                        </div>
                        <div className="contentTypeOption text-color-dark-white">
                            Serien
                        </div>
                    </div>
                    <div className="filterOptions flex gap-4 text-md font-medium">
                        <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                            <Dropdown name="Erscheinungsjahr" />
                        </div>

                        <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                            <Dropdown name="Genres" />
                        </div>

                        <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                            <Dropdown name="Preis" />
                        </div>

                        <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                            <Dropdown name="Bewertung" />
                        </div>

                        <div className="filterOption text-color-link hover:text-color-link-hover cursor-pointer">
                            <Dropdown name="Produktionsland" />
                        </div>
                    </div>
                    <div className="resetOption text-color-link hover:text-color-link-hover cursor-pointer flex text-sm items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 color-dark-grey">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        ZURÜCKSETZEN
                    </div>
                </div>
                <div>
                    <MovieList />
                </div>
            </div>
        </>
    );
}

export default Movies;
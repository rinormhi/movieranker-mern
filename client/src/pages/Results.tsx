import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import Dropdown from '../components/common/Filter/GenresDropdown';
import { WatchProvider } from '../interfaces/WatchProvider'
import ResultsMovieList from '../components/common/Movies/ResultsMovieList';

const Results: React.FC = () => {

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
                <h5 className="mb-2 ">Deine Suche ergab</h5>
                <div>
                    <ResultsMovieList />
                </div>
            </div>
        </>
    );
}

export default Results;
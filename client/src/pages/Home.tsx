import Hero from "../components/common/Hero"
import NowPlayingMovies from "../components/common/Movies/NowPlayingMovies";
import PopularMovies from "../components/common/Movies/PopularMovies";
import TopRatedMovies from "../components/common/Movies/TopRatedMovies";
import UpcomingMovies from "../components/common/Movies/UpcomingMovies";

const Home = () => {
    return (
        <>
            <Hero />
            <div className="container">
                <h2 className="text-center mb-4">Die besten Filme</h2>
                <TopRatedMovies />

                <h2 className="text-center mb-4 mt-12">Derzeit im Kino</h2>
                <NowPlayingMovies />

                
                <h2 className="text-center mb-4 mt-12">Bald im Kino</h2>
                <UpcomingMovies />

                <h2 className="text-center mb-4 mt-12">Beliebte Filme</h2>
                <PopularMovies />
            </div>
        </>
    );
}

export default Home;
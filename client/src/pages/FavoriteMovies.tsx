import FavoriteMovieList from '../components/common/Movies/FavoriteMovieList';

const Movies: React.FC = () => {
    return (
        <>
            <div className="container">
                <h5 className="mb-2 ">Hier siehst du deine Favorites</h5>
                <div>
                    <FavoriteMovieList />
                </div>
            </div>
        </>
    );
}

export default Movies;
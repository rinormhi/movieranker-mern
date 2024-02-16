import MovieList from '../components/common/Movies/MovieList';
import FilterComponent from "../components/common/Filter/FilterComponent";
import ContentHeader from '../components/common/Movies/ContentHeader';

const Movies: React.FC = () => {
    return (
        <div className="container ">
            <ContentHeader />
            <FilterComponent />
            <MovieList />
        </div>
    );
}

export default Movies;
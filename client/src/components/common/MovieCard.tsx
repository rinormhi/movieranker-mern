// MovieCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MovieCardProps } from '../../interfaces/MovieCardProps';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="w-[calc(25%-20px)] md:w-[calc(20%-17px)]">
            <div key={movie.id}>
                <img
                    className='rounded-md'
                    src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                    alt={movie.title}
                />
            </div>
        </Link>
    );
};

export default MovieCard;

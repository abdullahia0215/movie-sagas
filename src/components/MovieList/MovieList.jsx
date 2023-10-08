import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    function goToMovieDetails(movieId) {
        history.push(`/detail/${movieId}`);
    }

    return (
        <main className="movieGrid">
            <h1 className="movieHeader">Movie List</h1>
            <div className="gridContainer">
                {movies.map(movie => {
                    return (
                        <div className="gridItem" key={movie.id}>
                            <div className="titleCard">
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} width="50%" />
                                <ul className="genreList">
                                    {movie.genres.map((genre, index) => (
                                        <li key={index}>{genre}</li>
                                    ))}
                                </ul>
                                <button
                                    className="detailsButton"
                                    onClick={() => goToMovieDetails(movie.id)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default MovieList;
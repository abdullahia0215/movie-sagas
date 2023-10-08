import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Get the movies state from the Redux store
  const movies = useSelector((store) => store.movies);

  // Get the history object from the React Router
  const history = useHistory();

  // Fetch the movies when the component mounts
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  // Function to navigate to movie details page
  function goToMovieDetails(movieId) {
    history.push(`/detail/${movieId}`);
  }

  return (
    <main className="movieGrid">
      {/* Main heading */}
      <h1 className="movieHeader">Movie List</h1>
      <div className="gridContainer">
        {/* Render each movie */}
        {movies.map((movie) => {
          return (
            <div className="gridItem" key={movie.id}>
              <div className="titleCard">
                {/* Display movie title */}
                <h3>{movie.title}</h3>

                {/* Display movie poster */}
                <img src={movie.poster} alt={movie.title} width="50%" />

                {/* Display movie genres */}
                <ul className="genreList">
                  {movie.genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>

                {/* Button to navigate to movie details */}
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

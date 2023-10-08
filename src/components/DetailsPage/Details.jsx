import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Details.css';

export default function DetailPage() {
    // Get the movie ID from the URL parameters
    const { id } = useParams();

    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // Get the movie and isLoading state from the Redux store
    const movie = useSelector((store) => store.singleMovieReducer);
    const isLoading = useSelector((store) => store.isLoading);

    // Get the history object from the React Router
    const history = useHistory();

    // Fetch the movie details when the component mounts
    useEffect(() => {
        dispatch({ type: "FETCH_DETAIL", payload: id });
    }, []);

    // If the data is still loading, show a loading message
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Render the movie details if the movie exists, otherwise show a "Movie not found" message
    return (
        <div className="detailHolder">
            {/* Button to go back to the previous page */}
            <button
                className="backButton"
                onClick={() => history.push("/")}
            >
                Back
            </button>
            <div className="container">
                {movie && movie.id ? (
                    <>
                        {/* Display the movie poster */}
                        <img src={movie.poster} alt={movie.title} />

                        {/* Display the movie title */}
                        <h2>{movie.title}</h2>

                        {/* Display the movie description */}
                        <p>{movie.description}</p>

                        {/* Display the movie genres */}
                        <h3>Genres:</h3>
                        <ul>
                            {movie.genres.map((genre, index) => (
                                // Display each genre
                                <li key={index}>{genre}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    // Display "Movie not found" message
                    <p>Movie not found.</p>
                )}
            </div>
        </div>
    );
}
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const movie = useSelector((store) => store.singleMovieReducer);
    const isLoading = useSelector((store) => store.isLoading);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_DETAIL", payload: id });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="detailHolder">
            <button
                className="backButton"
                onClick={() => history.push("/")}
            >
                Back
            </button>
            <div className="container">
                {movie && movie.id ? (
                    <>
                        <img src={movie.poster} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <h3>Genres :</h3>
                        <ul>
                            {movie.genres.map((genre, index) => (
                                <li key={index}>{genre}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Movie not found.</p>
                )}
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Details() {
    const history = useHistory();
    const [selectedGenre, setSelectedGenre] = useState('');   
    const [addedGenres, setAddedGenres] = useState([]);
    const [addGenreButtonOn, setAddGenreButtonOff] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [poster, setPoster] = useState('');
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);
    useEffect(() => { dispatch({ type: 'FETCH_GENRES' }) }, []);

    function selectGenre(e) {
      setSelectedGenre(e.target.value);
      
      if (addedGenres.find(genre => genre.id === e.target.value) !== undefined) {
        setAddGenreButtonOff(true);
      } else {
        setAddGenreButtonOff(false);
      }
    }
    
    function addGenre() {
      setAddedGenres([...addedGenres, genres.find(genre => genre.id === selectedGenre)]);
      setSelectedGenre('');
      setAddGenreButtonOff(true);
    }
    
    function deleteGenre(genreId) {
      setAddedGenres(addedGenres.filter(genre => genreId !== genre.id));
    }
    
    function createMovie() {
      const movieObject = {title, poster, description, genres: addedGenres };
      dispatch({type: 'CREATE_MOVIE', payload: movieObject});
      history.push('/');
    }
    
}
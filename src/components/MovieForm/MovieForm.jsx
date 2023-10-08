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
    
    return (
        <div className="movieFormPaper">
          <div className="titlePosterForm">
            <label>Movie title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            <label>Movie poster URL</label>
            <input type="text" value={poster} onChange={e => setPoster(e.target.value)} />
          </div>
          <div>
            <label>Movie description</label>
            <textarea rows={5} className="descriptionBox" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="genreForm">
            <label>Genres</label>
            {genres.length > 0 ? (
              <select value={selectedGenre} onChange={selectGenre} >
                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
              </select>
            ) : (
              <p>Loading genres...</p>
            )}
            <button disabled={addGenreButtonOn} onClick={addGenre}>Add genre</button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Genre</th>
                  <th>Delete?</th>
                </tr>
              </thead>
              <tbody>
                {addedGenres.map(genre => (
                  <tr key={genre.id}>
                    <td>{genre.name}</td>
                    <td><button onClick={() => deleteGenre(genre.id)}>Delete</button></td>
                  </tr>))}
              </tbody>
            </table>
          </div>
          <button onClick={createMovie}>Add movie</button>
        </div>
      );
}
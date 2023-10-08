import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import DetailsPage from "../DetailsPage/Details";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <nav>
          <ul className="navBar">
            <li>
              <NavLink to="/">Movie list</NavLink>
            </li>
            <li>
              <NavLink to="/addmovie">Add movie form</NavLink>
            </li>
          </ul>
        </nav>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/detail/:id">
          <DetailsPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;

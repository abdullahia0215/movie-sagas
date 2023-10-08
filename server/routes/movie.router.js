const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query =
    `SELECT movies.id, title, poster, JSON_AGG(name) AS genres FROM movies 
    JOIN movies_genres ON movie_id = movies.id 
    JOIN genres ON genre_id = genres.id 
    GROUP BY movies.id 
    ORDER BY "title" ASC`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

router.get('/:id', async (req, res) => {
  try {
    const queryText =
      'SELECT movies.id, title, description, poster, JSON_AGG(name) AS genres FROM movies ' +
      'JOIN movies_genres ON movie_id = movies.id ' +
      'JOIN genres ON genres.id = genre_id ' +
      'WHERE movies.id = $1 GROUP BY movies.id';
    const response = await pool.query(queryText, [req.params.id]);
    res.send(response.rows[0]);
  } catch (error) {
    console.log('Oh balls! There is a GET error for singular movies!', error);
    res.sendStatus(500);
  }
});

router.post('/', (req, res) => {
  console.log(req.body);
  const insertMovieQuery = `
    INSERT INTO "movies" ("title", "poster", "description")
    VALUES ($1, $2, $3)
    RETURNING "id";`
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id
      let insertMovieGenreQuery = `INSERT INTO "movies_genres" ("movie_id", "genre_id") VALUES `;
      const genreParams = [createdMovieId];
      for (let i = 0; i < req.body.genres.length; i++) {
        insertMovieGenreQuery += `($1, $${i + 2})`;
        genreParams.push(req.body.genres[i].id);
      }
      insertMovieGenreQuery += ';';
      pool.query(insertMovieGenreQuery, genreParams).then(result => {
        res.sendStatus(201);
      }).catch(err => {
        console.log(err);
        res.sendStatus(500)
      })
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
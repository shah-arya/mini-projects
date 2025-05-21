const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Body-parser middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Database connection
const db = new sqlite3.Database('./Flick_Finder.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM Users WHERE Email = ? AND Password = ?";
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.error(err.message);
        } else if (row) {
            res.send('Login successful!');
        } else {
            res.status(404).send('User not found or password incorrect');
        }
    });
});

// Registration route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = "INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)";
    db.run(sql, [username, email, password], function(err) {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.error(err.message);
        } else {
            res.send('User registered successfully!');
        }
    });
});

// Search route
app.get('/search', (req, res) => {
    const { query } = req.query;
    const sql = "SELECT Title, ReleaseYear FROM Movies WHERE Title LIKE ?";
    db.all(sql, [`%${query}%`], (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.error(err.message);
        } else {
            res.json(rows);
        }
    });
});

//change 3.1
// Endpoint to fetch movie details including director and genres
app.get('/movie-details', (req, res) => {
    const { movieId } = req.query;
    const sql = `
    SELECT Movies.Title, Movies.ReleaseYear, Directors.Name as Director, GROUP_CONCAT(Genres.GenreName) as Genres
    FROM Movies
    JOIN Directors ON Movies.DirectorID = Directors.DirectorID
    JOIN MovieGenres ON Movies.MovieID = MovieGenres.MovieID
    JOIN Genres ON MovieGenres.GenreID = Genres.GenreID
    WHERE Movies.MovieID = ?
    GROUP BY Movies.MovieID`;
    db.get(sql, [movieId], (err, row) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.error(err.message);
        } else {
            res.json(row);
        }
    });
});

//change 3.2
// Endpoint to fetch movies by actor
app.get('/movies-by-actor', (req, res) => {
    const { actorId } = req.query;
    const sql = `
    SELECT Movies.Title, Movies.ReleaseYear
    FROM Movies
    JOIN ActBy ON Movies.MovieID = ActBy.MovieID
    WHERE ActBy.ActorID = ?`;
    db.all(sql, [actorId], (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.error(err.message);
        } else {
            res.json(rows);
        }
    });
});

// change 3.4
// Endpoint to fetch movies by title and optionally refine by genre
app.get('/refined-movies', (req, res) => {
    const { title, genre } = req.query;
    let sql = `
    SELECT Movies.Title, Movies.ReleaseYear, GROUP_CONCAT(Genres.GenreName) AS Genres
    FROM Movies
    JOIN MovieGenres ON Movies.MovieID = MovieGenres.MovieID
    JOIN Genres ON MovieGenres.GenreID = Genres.GenreID
    WHERE Movies.Title LIKE ?
    GROUP BY Movies.MovieID`;
    
    if (genre) {
        sql += ` HAVING Genres LIKE '%${genre}%'`;
    }

    db.all(sql, [`%${title}%`], (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            console.error(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



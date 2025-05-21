PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE IF EXISTS UserFavorites;
DROP TABLE IF EXISTS MovieGenres;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS ActBy;
DROP TABLE IF EXISTS Actors;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Directors;
DROP TABLE IF EXISTS Genres;


CREATE TABLE Directors (
    DirectorID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
);

CREATE TABLE Movies (
    MovieID INTEGER PRIMARY KEY,
    Title TEXT NOT NULL,
    ReleaseYear INTEGER,
    DirectorID INTEGER,
    FOREIGN KEY (DirectorID) REFERENCES Directors(DirectorID)
);

CREATE TABLE Actors (
    ActorID INTEGER PRIMARY KEY,
    ActorName TEXT NOT NULL
);

CREATE TABLE ActBy (
    ActorID INTEGER,
    MovieID INTEGER,
    FOREIGN KEY (ActorID) REFERENCES Actors(ActorID),
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID),
    PRIMARY KEY (ActorID, MovieID)
);

CREATE TABLE Users (
    UserID INTEGER PRIMARY KEY,
    Username TEXT NOT NULL UNIQUE,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL
);

CREATE TABLE UserFavorites (
    UserID INTEGER,
    MovieID INTEGER,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID),
    PRIMARY KEY (UserID, MovieID)
);

CREATE TABLE Reviews (
    ReviewID INTEGER PRIMARY KEY,
    UserID INTEGER,
    MovieID INTEGER,
    Rating INTEGER CHECK(Rating >= 1 AND Rating <= 10),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID)
);

CREATE TABLE Genres (
    GenreID INTEGER PRIMARY KEY,
    GenreName TEXT NOT NULL
);

CREATE TABLE MovieGenres (
    MovieID INTEGER,
    GenreID INTEGER,
    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID),
    PRIMARY KEY (MovieID, GenreID)
);

-- Insert data into Directors
INSERT INTO Directors (DirectorID, Name) VALUES
(1, 'Christopher Nolan'),
(2, 'Quentin Tarantino'),
(3, 'Steven Spielburg'),
(4, 'Stanley Kubrick'),
(5, 'Martin Scorsese'),
(6, 'Shyamalan');


-- Insert data into Movies
INSERT INTO Movies (MovieID, Title, ReleaseYear, DirectorID) VALUES
(1, 'Inception', 2010, 1),
(2, 'Django Unchained', 2012, 2),
(3, 'Saving Private Ryan', 1998, 3),
(4, 'Catch Me If You Can', 2002, 3),
(5, 'Paths of Glory', 1957, 4),
(6, 'The Wolf of Wall Street', 2013, 5);


-- Insert data into Actors
INSERT INTO Actors (ActorID, ActorName) VALUES
(1, 'Leonardo DiCaprio'),
(2, 'Jamie Foxx'),
(3, 'Tom Hanks'),
(4, 'Kirk Douglas');


-- Insert data into ActBy
INSERT INTO ActBy (ActorID, MovieID) VALUES
(1, 1),  -- Leonardo DiCaprio in Inception
(2, 2), 
(1, 4),
(1, 6),
(3, 3),
(4, 5);


-- Insert data into Users
INSERT INTO Users (UserID, Username, Email, Password) VALUES
(1, 'john_doe', 'john@example.com', 'password123');

INSERT INTO UserFavorites (UserID, MovieID) VALUES
(1, 1),
(1, 2);

-- Insert data into Reviews
INSERT INTO Reviews (ReviewID, UserID, MovieID, Rating) VALUES
(1, 1, 1, 9);  -- John Doe rates Inception 9 out of 10

-- Insert data into Genres
INSERT INTO Genres (GenreID, GenreName) VALUES
(1, 'Science Fiction'),
(2, 'Western'),
(3, 'War'),
(4, 'Action'),
(5, 'Crime'),
(6, 'Comedy'),
(7, 'Thriller');

-- Insert data into MovieGenres
INSERT INTO MovieGenres (MovieID, GenreID) VALUES
(1, 1),  -- Inception is Science Fiction
(2, 2),  -- Django Unchained is Western
(1, 4),
(3, 3),
(3, 4),
(4, 5),
(4, 6),
(5, 3),
(5, 4),
(6, 6),
(6, 7);
COMMIT;

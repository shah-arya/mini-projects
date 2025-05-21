document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    // AJAX call to server-side login handler
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.text())  
    .then(data => {
        alert(data);  // Simple alert
    })
    .catch(error => console.error('Error logging in:', error));
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    // AJAX call to server-side registration handler

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, password: password })
    })
    .then(response => response.text()) 
    .then(data => {
        alert(data);  // Simple alert;
    })
    .catch(error => console.error('Error registering:', error));
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchQuery').value;
    
    fetch(`/search?query=${encodeURIComponent(searchQuery)}`, {
        method: 'GET'
    })
    .then(response => response.json())  
    .then(data => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';  // Clear previous results
        if (data.length) {
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.textContent = `Title: ${movie.Title}, Year: ${movie.ReleaseYear}`;
                resultsContainer.appendChild(movieDiv);
            });
        } else {
            resultsContainer.textContent = 'No movies found.';
        }
    })
    .catch(error => console.error('Error searching movies:', error));
});


// change 3.1
document.getElementById('movieDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const movieId = document.getElementById('movieIdInput').value;

    fetch(`/movie-details?movieId=${encodeURIComponent(movieId)}`)
    .then(response => response.json())
    .then(data => {
        const detailsContainer = document.getElementById('movieDetails');
        detailsContainer.innerHTML = `Title: ${data.Title}, Year: ${data.ReleaseYear}, Director: ${data.Director}, Genres: ${data.Genres}`;
    })
    .catch(error => console.error('Error fetching movie details:', error));
});

//change 3.2
document.getElementById('moviesByActorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const actorId = document.getElementById('actorIdInput').value;

    fetch(`/movies-by-actor?actorId=${encodeURIComponent(actorId)}`)
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('actorMovies');
        resultsContainer.innerHTML = '';
        data.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.textContent = `Title: ${movie.Title}, Year: ${movie.ReleaseYear}`;
            resultsContainer.appendChild(movieDiv);
        });
    })
    .catch(error => console.error('Error fetching movies by actor:', error));
});

//change 3.4
document.getElementById('refinedSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('searchTitle').value;
    const genre = document.getElementById('searchGenre').value;

    fetch(`/refined-movies?title=${encodeURIComponent(title)}&genre=${encodeURIComponent(genre)}`)
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.getElementById('refinedResults');
        resultsContainer.innerHTML = '';
        if (data.length) {
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.textContent = `Title: ${movie.Title}, Year: ${movie.ReleaseYear}, Genres: ${movie.Genres}`;
                resultsContainer.appendChild(movieDiv);
            });
        } else {
            resultsContainer.textContent = 'No movies found.';
        }
    })
    .catch(error => console.error('Error in refined search:', error));
});

const searchInput = document.querySelector('.searchInput');
let movies = [];

const fetchMovies = async () => {
  try {
    const response = await fetch('/data/movies.json');
    if (!response.ok) {
      throw new Error(`HTTP ERROR: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched Movies:', data);
    return data;
  } catch (e) {
    console.error('Error fetching movies:', e);
  }
};

const renderMovies = (movies) => {
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    movieDiv.innerHTML = `
      <img src="/pages/img/Movieimg.png" alt="${movie.Titel} Poster">
      <h3>${movie.Titel}</h3>
      <p>Genre: ${movie.Genre}</p>
    `;

    movieContainer.appendChild(movieDiv);
  });
};

const getInput = (e) => {
  const filterArr = [];
  const inputValue = e.target.value.trim().toLowerCase();

  if (!inputValue) {
    renderMovies(movies);
    return;
  }

  for (let movie of movies) {
    const titleMatch = movie.Titel && movie.Titel.toLowerCase().includes(inputValue);
    const genreMatch = movie.Genre && movie.Genre.toLowerCase().includes(inputValue);

    if (titleMatch || genreMatch) {
      filterArr.push(movie);
    }
  }

  renderMovies(filterArr);
};

const init = async () => {
  movies = await fetchMovies();
  renderMovies(movies);
};

searchInput.addEventListener('keyup', getInput);
init();

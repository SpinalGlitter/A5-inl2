async function loadMovies() {
  const response = await fetch('/api/movies');
  if (!response.ok) {
    throw new Error(`HTTP-error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  const movies = responseData.data;

  const movieContainer = document.querySelector('.movie-container');

  movies.forEach((movie) => {
    const movieAttributes = movie.attributes;

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieContainer.appendChild(movieCard);

    const movieImg = document.createElement('img');
    movieImg.src = movieAttributes.image.url;
    movieImg.alt = `Bild för ${movieAttributes.title}`;
    movieCard.appendChild(movieImg);

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movieAttributes.title;
    movieCard.appendChild(movieTitle);

    const movieIntro = document.createElement('p');
    movieIntro.textContent = movieAttributes.intro;
    movieCard.appendChild(movieIntro);

    movieTitle.addEventListener('click', (event) => {
      event.stopPropagation();
      window.location.href = `/movies/${movie.id}`;
    });
  });
}

async function loadMovieHeadline() {
  const response = await fetch('/api/movies-headline');
  if (!response.ok) {
    throw new Error(`HTTP-error! Status: ${response.status}`);
  }
  const data = await response.json();

  const headerElement = document.querySelector('.movie-headline');
  headerElement.textContent = data.HeadlineText;
}

export async function loadMovieContent() {
  loadMovieHeadline();
  loadMovies();
}

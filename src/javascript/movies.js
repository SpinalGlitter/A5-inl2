async function loadMovies() {
  const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
  if (!response.ok) {
    throw new Error(`HTTP-error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  const movies = responseData.data;

  const movieContainer = document.querySelector('.movie-container');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <i class="close-button fas fa-times"></i>
      <div class="modal-body"></div>
    </div>
  `;

  document.body.appendChild(modal);

  const modalBody = document.querySelector('.modal-body');
  const closeModal = document.querySelector('.close-button');

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

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

      modalBody.innerHTML = `
        <p><strong>Titel:</strong> ${movieAttributes.title}</p>
        <p><strong>IMDB-ID:</strong> ${movieAttributes.imdbId}</p>
        <p><strong>Handling:</strong> ${movieAttributes.intro}</p>
        <img src="${movieAttributes.image.url}" alt="${movieAttributes.title}" />`;

      modal.style.display = 'block';
    });
  });
}

async function loadMovieHeadline() {
  const response = await fetch('data/moviesHeadline.json');
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

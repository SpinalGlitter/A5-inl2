async function loadMovies() {
  const response = await fetch('data/movies.json');
  if (!response.ok) {
    throw new Error(`HTTP-error! Status: ${response.status}`);
  }
  const movies = await response.json();

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
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieContainer.appendChild(movieCard);

    const movieImg = document.createElement('img');
    movieImg.src = movie.Bild;
    movieImg.alt = `Bild för ${movie.Titel}`;
    movieCard.appendChild(movieImg);

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Titel;
    movieCard.appendChild(movieTitle);

    const movieGenre = document.createElement('p');
    movieGenre.textContent = movie.Genre;
    movieCard.appendChild(movieGenre);

    movieTitle.addEventListener('click', (event) => {
      event.stopPropagation();

      modalBody.innerHTML = `
        <p><strong>Titel:</strong> ${movie.Titel}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Handling:</strong> ${movie.Beskrivning}</p>
        <p><strong>Skådespelare:</strong> ${movie.Skådespelare}</p>
        <p><strong>Språk:</strong> ${movie.Språk}</p>
        <p><strong>Rating:</strong> ${movie.Rating}</p>
        <p><strong>Speltid:</strong> ${movie.Längd}</p>
        <p><strong>Rek. ålder:</strong> ${movie.RekommenderadAlder}</p>
        <p><strong>Status:</strong> ${movie.Label}</p>`;

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

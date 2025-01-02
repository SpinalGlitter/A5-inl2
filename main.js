import { initHeader } from './pages/index/header.js';
import { loadkids } from './pages/kids/kids.js';
import { loadMovieContent } from './pages/index/movies.js';

initHeader();

const checkKids = document.querySelector('.article-kids');

if (checkKids) {
  loadkids();
}

const checkMovies = document.querySelector('.movie-container');

if (checkMovies) {
  loadMovieContent();
}

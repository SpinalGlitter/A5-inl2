import { initHeader } from './pages/index/header.js';
import { loadkids } from './pages/index/kids.js';

initHeader();

const checkKids = document.querySelector('.article-kids');

if (checkKids) {
  loadkids();
}

import './style.scss';
import './src/javascript/header.js';
import { buildInfoSection } from './src/javascript/infoModal.js';
import { loadkids } from './src/javascript/kids.js';

document.addEventListener('DOMContentLoaded', () => {
  buildInfoSection();
});

const checkKids = document.querySelector('.article-kids');

if (checkKids) {
  loadkids();
}

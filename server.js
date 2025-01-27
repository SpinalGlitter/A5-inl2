import express from 'express';
import axios from 'axios';
import { engine } from 'express-handlebars';
import fs from 'fs/promises';
import headerData from './dist/data/header.js';
import footerData from './dist/data/footer.js';

const app = express();
const PORT = 5080;

app.use(express.static('dist'));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
  })
);

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', async (req, res) => {
  try {
    const infoModalPath = './dist/data/infoModal.json';
    const moviesHeadlinePath = './dist/data/moviesHeadline.json';

    const [infoModal, moviesHeadline] = await Promise.all([
      fs.readFile(infoModalPath, 'utf-8').then(JSON.parse),
      fs.readFile(moviesHeadlinePath, 'utf-8').then(JSON.parse),
    ]);

    const moviesResponse = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    const movies = moviesResponse.data.data.map((movie) => ({
      id: movie.id,
      ...movie.attributes,
    }));

    res.render('index', {
      layout: 'main',
      header: headerData.header,
      footer: footerData.footer,
      infoData: infoModal,
      moviesHeadline: moviesHeadline.HeadlineText,
      movies,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/movies/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
    const movie = response.data.data.attributes;

    res.render('movie', {
      header: headerData.header,
      footer: footerData.footer,
      title: movie.title,
      intro: movie.intro,
      image: movie.image.url,
      id: id,
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(404).send('The movie was not found.');
  }
});

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, server };

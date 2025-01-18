import express from 'express';
import path from 'path';
import axios from 'axios';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const PORT = 5080;

app.use(express.static(path.resolve('dist')));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API', error);
    res.status(500).send('Not able to load data from API.');
  }
});

app.get('/movies/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
    const movie = response.data.data.attributes;

    res.render('movie', {
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

app.get('/api/header', (req, res) => {
  const filePath = path.join(__dirname, 'dist', 'data', 'header.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading header.json:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/footer', (req, res) => {
  const filePath = path.join(__dirname, 'dist', 'data', 'footer.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading footer.json:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

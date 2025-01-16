import express from 'express';
import path from 'path';
import axios from 'axios';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5080;

app.use(express.static(path.resolve('dist')));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('hbs', engine({ extname: '.hbs' })); // Använd .hbs som filändelse
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

    console.log(`Fetching details for movie ID: ${id}`);

    res.render('movie', {
      // layout: false,
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

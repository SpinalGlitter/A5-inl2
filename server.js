import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
const PORT = 3080;

app.use(express.static(path.resolve('dist')));

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API', error);
    res.status(500).send('Not able to load data from API.');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

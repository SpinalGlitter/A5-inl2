import express from 'express';
import path from 'path';

const app = express();
const PORT = 3080;

app.use(express.static(path.resolve('dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

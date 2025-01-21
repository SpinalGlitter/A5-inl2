import { afterAll, expect, test } from '@jest/globals';
import request from 'supertest';
import { app, server } from '../server.js';

afterAll(() => {
  if (server) {
    server.close();
  }
});
//Testar backend. Testar innehållet från API.
test('Home page shows list of movies', async () => {
  const response = await request(app).get('/api/movies').expect('Content-type', /json/).expect(200);

  expect(response.body.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        attributes: expect.objectContaining({
          title: 'Isle of dogs',
        }),
      }),
      expect.objectContaining({
        attributes: expect.objectContaining({
          title: 'Forrest Gump',
        }),
      }),
      expect.objectContaining({
        attributes: expect.objectContaining({
          title: 'Training Day',
        }),
      }),
    ])
  );
});

test.each([
  { id: 1, title: 'Isle of dogs' },
  { id: 2, title: 'Encanto' },
  { id: 3, title: 'The Shawshank Redemption' },
])('Movie page shows title', async ({ id, title }) => {
  const response = await request(app).get(`/movies/${id}`).expect('Content-type', /html/).expect(200);

  expect(response.text).toContain(title);
});

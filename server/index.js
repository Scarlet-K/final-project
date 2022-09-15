require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
// const uploadsMiddleware = require('./upload-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

// app.get('/api/hello', (req, res) => {
//   res.json({ hello: 'world' });
// });

app.get('/api/memento', (req, res) => {
  res.json({ new: 'start' });
});

app.post('/api/memento', (req, res, next) => {
  const { date, location, description } = req.body;
  if (!date || !location || !description) {
    throw new ClientError(400, 'date, location, and description are required fields');
  }
  const sql = `
    insert into "entries" ("date", "location", "description")
    values ($1, $2, $3)
    returning *
  `;
  const params = [date, location, description];
  db.query(sql, params)
    .then(result => {
      const [entries] = result.rows;
      res.status(201).json(entries);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

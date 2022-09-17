require('dotenv/config');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./upload-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(uploadsMiddleware);
// app.use(express.json());

app.get('/api/memento', (req, res, next) => {
  const sql = `
    select *
      from "entries"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/memento/:entryId', (req, res, next) => {
  const entryId = Number(req.params.entryId);
  const sql = `
   select *
     from "entries"
     where "entryId" = $1
  `;
  const params = [entryId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find entry with entryId ${entryId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/memento', (req, res, next) => {
  const { date, location, description } = req.body;
  if (!date || !location || !description) {
    throw new ClientError(400, 'date, location, and description are required fields');
  }
  const url = `/images/${req.file.filename}`;
  const sql = `
    insert into "entries" ("date", "location", "description", "imageUrl")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [date, location, description, url];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

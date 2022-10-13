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

app.use(express.json());
app.use(staticMiddleware);
app.use(uploadsMiddleware);

app.get('/api/memento', (req, res, next) => {
  const sql = `
    select *
      from "entries"
      order by "entryId" desc
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/memento/:entryId', (req, res, next) => {
  const entryId = Number(req.params.entryId);
  if (!entryId) {
    throw new ClientError(400, 'entryId must be a positive integer');
  }
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
  const { date, placeName, latLng, address, description } = req.body;
  if (!date || !placeName || !latLng || !address || !description) {
    throw new ClientError(400, 'date, address, and description are required fields');
  }
  const imageUrl = req.file.location;
  const sql = `
    insert into "entries" ("date", "placeName", "latLng", "address", "description", "imageUrl")
    values ($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const params = [date, placeName, latLng, address, description, imageUrl];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => next(err));
});

app.put('/api/memento/:entryId', (req, res, next) => {
  const entryId = Number(req.params.entryId);
  if (!Number.isInteger(entryId) || entryId < 1) {
    throw new ClientError(400, 'entryId must be a positive integer');
  }
  const { date, placeName, latLng, address, description } = req.body;
  const imageUrl = req.file.location;
  const sql = `
    update "entries"
      set "date"        = $1,
          "placeName"   = $2,
          "latLng"      = $3,
          "address"     = $4,
          "description" = $5,
          "imageUrl"    = $6
    where "entryId" = $7
    returning *
  `;
  const params = [date, placeName, latLng, address, description, imageUrl, entryId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find entry with entryId ${entryId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

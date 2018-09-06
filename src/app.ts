import express from 'express';
import { Client } from 'pg';

const { DATABASE_URL } = process.env;
const client = new Client({
  connectionString: DATABASE_URL,
});
const app = express();
app.get('/', (_, res) => {
  client
    .connect()
    .then(() => client.query('SELECT * FROM hellotable'))
    .then(result => {
      res.send(`${result.rows[0].name}\n`);
      client.end();
    })
    .catch(() => {
      res.send('ERROR');
      client.end();
    });
});
export default app;

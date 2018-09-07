import express from 'express';
import kue from 'kue';
import { Client } from 'pg';

const { DATABASE_URL, REDIS_URL } = process.env;
const client = new Client({
  connectionString: DATABASE_URL,
});
const app = express();
const queue = kue.createQueue({
  redis: REDIS_URL,
});
app.get('/', (_, res) => {
  client
    .connect()
    .then(() => client.query('SELECT * FROM hellotable'))
    .then(result => {
      res.send(`${result.rows[0].name} Success\n`);
      client.end();
    })
    .catch(() => {
      res.send('ERROR');
      client.end();
    });
});
app.get('/intense', (_, res) => {
  const job = queue
    .create('mytype', {
      letter: 'a',
      title: 'mytitle',
    })
    .removeOnComplete(true)
    .save((err: any) => {
      if (err) {
        res.send('error');
        return;
      }
      job.on('complete', result => {
        res.send(`Hello Intense ${result}`);
      });
      job.on('failed', () => {
        res.send('error');
      });
    });
});
export default app;

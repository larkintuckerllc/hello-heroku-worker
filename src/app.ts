import express from 'express';
import { Queue } from 'kue';
import { Client } from 'pg';

const app = express();
let client: Client;
let queue: Queue;
export const initialize = (pClient: Client, pQueue: Queue) => {
  client = pClient;
  queue = pQueue;
};
app.get('/', async (_, res, next) => {
  try {
    const result = await client.query('SELECT * FROM hellotable');
    res.send(`${result.rows[0].name} Success Redis\n`);
  } catch (error) {
    next(error);
  }
});
app.get('/intense', (_, res, next) => {
  const job = queue
    .create('mytype', {
      letter: 'a',
      title: 'mytitle',
    })
    .removeOnComplete(true)
    .save((error: any) => {
      if (error) {
        next(error);
        return;
      }
      job.on('complete', result => {
        res.send(`Hello Intense ${result}`);
      });
      job.on('failed', () => {
        const failedError = new Error('failed');
        next(failedError);
      });
    });
});
export default app;

import kue from 'kue';

const { REDIS_URL } = process.env;
const queue = kue.createQueue({
  redis: REDIS_URL,
});
queue.process('mytype', (job, done) => {
  switch (job.data.letter) {
    case 'a':
      done(null, 'apple');
      break;
    default:
      done(null, 'unknown');
  }
});

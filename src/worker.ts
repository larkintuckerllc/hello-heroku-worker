import kue from 'kue';

const { REDIS_URL } = process.env;

try {
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
} catch (error) {
  console.log(error);
}

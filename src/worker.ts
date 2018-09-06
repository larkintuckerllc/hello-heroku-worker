import kue from 'kue';

const queue = kue.createQueue();
queue.process('mytype', (job, done) => {
  switch (job.data.letter) {
    case 'a':
      done(null, 'apple');
      break;
    default:
      done(null, 'unknown');
  }
});
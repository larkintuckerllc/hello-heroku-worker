import request from 'supertest';
import app from './app';

test('should return status code 200', done => {
  request(app)
    .get('/')
    .expect(200)
    .end(err => {
      if (err) {
        return done(err);
      }
      done();
    });
});

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // Export your Express app from server.js

let server;

beforeAll((done) => {
  server = app.listen(4001, done); // Use a different port for testing
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Auth API', () => {
  it('should register a user', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'test1234' });
    expect(res.body.success).toBe(true);
  }, 15000); // 15 seconds timeout
});
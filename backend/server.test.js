const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const User = require('./models/User'); 
let server;

beforeAll((done) => {
  server = app.listen(4001, done);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Auth API', () => {
  beforeEach(async () => {
    // Remove test user before each test
    await User.deleteOne({ email: 'test@example.com' });
  });

  it('should register a user', async () => {
    const res = await request(server)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'test1234' });
    expect(res.body.success).toBe(true);
  }, 15000);
});
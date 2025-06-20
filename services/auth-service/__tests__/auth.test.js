jest.mock('../config/db', () => ({
  query: jest.fn()
}));

const db = require('../config/db');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { register, login } = require('../src/auth.controller');

const app = express();
app.use(bodyParser.json());
app.post('/auth/register', register);
app.post('/auth/login', login);

describe('Auth Service (Mocked DB)', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should register a user', async () => {
    db.query.mockResolvedValueOnce({ rows: [], rowCount: 1 });

    const res = await request(app).post('/auth/register').send({
      email: 'unit@mail.com',
      password: '123456',
      phone: '+639999999999'
    });

    expect(res.statusCode).toBe(201);
  });

  it('should fail login with wrong password', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{ id: 1, password: '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }]
    });

    const res = await request(app).post('/auth/login').send({
      email: 'unit@mail.com',
      password: 'wrongpass'
    });

    expect(res.statusCode).toBe(401);
  });
});

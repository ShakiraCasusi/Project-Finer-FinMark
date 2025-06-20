const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/auth',    createProxyMiddleware({ target: 'http://auth-service:3001', changeOrigin: true }));
app.use('/user',    createProxyMiddleware({ target: 'http://user-service:3002', changeOrigin: true }));
app.use('/finance', createProxyMiddleware({ target: 'http://finance-service:3003', changeOrigin: true }));

app.listen(80, () => console.log('API Gateway on port 80'));

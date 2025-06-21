const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());


app.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://auth-service:3001',
    changeOrigin: true
  })
);

const PORT = 8080;
app.listen(PORT, () => console.log(`API Gateway on port ${PORT}`));

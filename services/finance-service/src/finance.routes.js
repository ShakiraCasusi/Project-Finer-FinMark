const router = require('express').Router();
const { createTxn, listTxn } = require('./finance.controller');

router.post('/tx', createTxn);
router.get('/tx', listTxn);

module.exports = router;

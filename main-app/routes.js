const express = require('express');
const router = express.Router();
const c = require('./controller');

router.get('/hello', c.hello);

module.exports = router;
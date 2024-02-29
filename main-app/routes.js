const express = require('express');
const router = express.Router();
const control = require('./controller');

router.get('/hello', control.hello);
router.post('/maps/restaurents', control.mresto);

router.post('/maps/textsearch', control.textsearch);
router.post('/maps/nearsearch', control.nearsearch);

module.exports = router;
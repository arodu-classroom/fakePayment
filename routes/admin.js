const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/payments', async function (req, res) {
    res.json(await database.selectAll());
});

module.exports = router;
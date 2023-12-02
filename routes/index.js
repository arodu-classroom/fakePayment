const express = require('express');
const router = express.Router();
const cards = require('../config/cards');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { cards: cards.getList() });
});

module.exports = router;

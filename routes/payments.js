const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cards = require('../config/cards');

// Middleware for Bearer authorization
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

/* POST home page. */
router.post('/',
    authenticateToken,
    body('full-name').notEmpty(),
    body('card-number').notEmpty().isCreditCard(),
    body('expiration-month').isLength({ min: 1, max: 2 }),
    body('expiration-year').isLength({ min: 4, max: 4 }),
    body('cvv').isLength({ min: 3, max: 4 }),
    body('amount').notEmpty(),
    body('currency').isLength({ min: 3, max: 3 }),
    body('description').notEmpty(),
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(errors)

        const card_number = req.body['card-number'];
        const full_name = req.body['full-name'];
        let response;
        let success = false;

        if (!cards.cardExists(card_number)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid card number',
                code: '001',
            });
        }

        if (full_name == 'REJECTED') {
            return res.status(400).json({
                success: false,
                message: 'Card rejected',
                code: '002',
            });
        }

        if (full_name == 'ERROR') {
            return res.status(400).json({
                success: false,
                message: 'Card error',
                code: '003',
            });
        }

        if (full_name == 'INSUFFICIENT') {
            return res.status(400).json({
                success: false,
                message: 'Insufficient funds',
                code: '004',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Payment successful',
            data: {
                transaction_id: uuidv4(),
                amount: req.body['amount'],
                currency: req.body['currency'],
                description: req.body['description'],
                reference: req.body['reference'] ?? null,
                date: new Date().toISOString(),
            },
            
        });

    });


router.get('/cards', function (req, res) {
    res.json(cards.getList());
});

router.get('/api-key', function (req, res) {
    const payload = {
        name: 'John Doe',
        date: new Date().toISOString(),
    };

    const apiKey = jwt.sign(payload, process.env.JWT_KEY);
    res.json({ apiKey });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});


// Middleware for Bearer authorization
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    // Verify the token and perform authentication logic here

    next();
};

/* POST home page. */
router.post('/',
    authenticateToken,
    body('full_name').notEmpty(),
    body('card_number').notEmpty().isCreditCard(),
    body('expiration_month').isLength({ min: 1, max: 2 }),
    body('expiration_year').isLength({ min: 4, max: 4 }),
    body('cvv').isLength({ min: 3, max: 4 }),
    body('zip_code').notEmpty(),
    body('amount').notEmpty(),
    body('currency').isLength({ min: 3, max: 3 }),
    body('description').notEmpty(),
    function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(errors)

        const card_number = req.body.card_number;
        let response;
        let success = false;

        switch (card_number) {
            case '4032039203477486':
                success = true;
                message = 'Successful purchase';
                break;
            case '4032038015814472':
                message = 'Insufficient funds';
                break;
            default:
                message = 'Invalid card number';
        }

        if (!success) {
            return res.status(400).json({
                success: false,
                message: message,
            });
        }

        return res.status(200).json({
            success: true,
            message: message,
            data: {
                transaction_id: uuidv4(),
                amount: req.body.amount,
                currency: req.body.currency,
                description: req.body.description,
                date: new Date().toISOString(),
            },
            
        });
    });

module.exports = router;
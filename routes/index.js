const express = require('express');
const router = express.Router();
const { query } = require('express-validator');

const auth = require('../middlewares/auth');
const geoIpController = require('../controllers/geoip');

router.get('/', (req, res) => res.send({
    status: 'running',
    uptime: Math.round(process.uptime())
}));

router.get('/lookup', [
    auth.validToken,
    query('ip')
        .isIP(4)
        .withMessage('Valid IPv4 address is required')
        .trim()
        .escape(),
    query('format')
        .isIn(['json','automate'])
        .withMessage('Format must be json or automate')
        .optional({ nullable: true }),
    geoIpController.lookup
]);

module.exports = router;
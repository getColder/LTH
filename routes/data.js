const express = require('express');
const router = express.Router();
const {getCurrentData} = require('../app/tcpserver')

router.get('/',(req, res, next) => {
    res.send(getCurrentData());
    next();
})

module.exports = router;
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')

router.use('/recs', records)
router.use('/', home)
module.exports = router
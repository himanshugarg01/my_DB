let router = require('express').Router();
let QueryRouter = require('./QueryRoute');


router.use('/query', QueryRouter);






router.use('/',Default);

module.exports = router;

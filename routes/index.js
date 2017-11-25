var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("im here");
    res.render('../doc/index.html', { title: 'SPGroup API Docs' });
});

module.exports = router;

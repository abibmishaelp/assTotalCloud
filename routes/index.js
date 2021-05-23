var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Assigment for TotalCloud Inc' });
});

router.get('/getDetails', function (req, res, next) {
  res.render('userDetails', {
    title: 'User Details'
  });
});


module.exports = router;

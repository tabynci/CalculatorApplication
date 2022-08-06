var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('X-Frame-Options', 'DENY')
  res.set('X-Content-Type-Options', 'nosniff')
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.set('Content-Security-Policy', "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'")
  res.render('index', { title: "Simple Application" });
});


module.exports = router;

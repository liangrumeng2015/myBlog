var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    msg:'我是博客接口'
  })
});



module.exports = router;

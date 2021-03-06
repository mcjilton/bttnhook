var express = require('express');
var router = express.Router();

/*
 * GET home page of bttn data
 */
router.get('/', function(req, res, next) {
  res.render('bttn', { title: 'bt.tn magic' });
});

/*
 * GET eventlist.
 */
router.get('/bttndata', function(req, res) {
    var db = req.db;
    db.collection('bttnhits').find().toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST new bttn event.
 */
router.post('/pressed', function(req, res) {
    var db = req.db;
    db.collection('bttnhits').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;

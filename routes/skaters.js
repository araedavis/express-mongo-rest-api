const router = require('express').Router();
const bodyParser = require('body-parser');
const Skater = require('../model/skater.js');

router
  .get('/', (req, res) => {
    Skater.find().select()
      .then((skaters) => {
        res.json(skaters);
      });
  });


//.post


//.put


//.delete


//.patch

module.exports = router;
// GET: /skaters/  ->  returns JSON list of all skater names (and info?)
// GET: /skaters/<id>  ->  returns JSON object of id
// POST: /skaters/ (JSON body)  ->  returns JSON object (with db generated fields like id)
// DELETE: /skaters/<id>  ->  returns JSON object ... or .... JSON message with name and id of deleted object
// PUT: /skaters/<id> (JSON body)  ->  returns JSON object

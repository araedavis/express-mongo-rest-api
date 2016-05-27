const router = require('express').Router();
const Team = require('../model/team.js');

var byId = function(req){
  return {_id: req.params.id};
};

router
.get('/', (req, res) => {
  const query = req.query.rank ? {rank: req.query.rank} : {};
  Team.find(query).select('teamName rank')
    .then((teams) => {
      res.json(teams);
    });
})

.get('/:id', (req, res, next) => {
  Team.findOne(byId(req))
    .then((team) => {
      res.json(team);
    })
    .catch( () => {
      next('Failed to find a matching team ID');
    });
})

.patch('/:id', (req, res, next) => {
  Team.findOneAndUpdate(byId(req), req.body, [{new: true}, {upsert: true}])
    .then((team) => {
      res.json(team);
    })
    .catch( () => {
      next('Failed to find a matching team ID');
    });
})

.delete('/:id', (req, res, next) => {
  Team.findOneAndRemove(byId(req))
    .then((team) => {
      res.send(`${team.name} has been removed from the database.`);
    })
    .catch(() => {
      next('Failed to find a matching skater ID');
    });
})

.post('/', (req, res, next) =>{
  new Team(req.body).save()
    .then((team) => {
      res.json(team);
    })
    .catch( err =>{
      next(err);
    });
});

module.exports = router;

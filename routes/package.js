const express = require('express');
const router = express.Router();
const packageCtrl = require('../controllers/package.controller')

/* GET users listing. */
router.get('/', function(req, res,next) {
  packageCtrl.list()
  .then((resultado) => res.json(resultado))
  .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    packageCtrl.create(req.body)
    .then(resultado => res.json(resultado))
    .catch(next);
})

module.exports = router;
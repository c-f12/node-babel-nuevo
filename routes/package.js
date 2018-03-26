const express = require('express');
const router = express.Router();
const cache = require('../cache.js');
const packageCtrl = require('../controllers/package.controller')

/*
//En el get tenemos que ponerle una ruta. Con * entra todo
router.get('*', (req, res, next) => {
  console.log('req.url', req.url)
  //Si ya tengo lo que quiero devolver, lo devuelvo y me ahorro hacer la consulta a la bbdd:
  if(cache[req.url]){
    console.log('cacheo: ', cache)
    return res.json(cache[req.url]);
  }
  next(); //En caso de que no este en la cache lo devuelvo
});
*/

function getGlobal(route, url) {
  if(url === '/'){
    return route;
  }
  return `${route}${url}`;
}


/* GET users listing. */
router.get('/', function(req, res,next) {
  packageCtrl.list()
  .then((result) => {
    const url = getGlobal('/packages', req.url);
    cache[url] = result;
    //res.json(resultado)
    // con _ las var creadas por nosotros
    res.json(result);
  })
  .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    packageCtrl.create(req.body)
    .then(resultado => {
      //console.log('package!!'); //console.log para ver si entra en post
      res.json(resultado)})
    .catch(error => next(error));
});

module.exports = router;
const routes = require('express').Router();

const UserController = require('../controllers/UserController');

routes.get('/', UserController.index);
routes.get('/:id', UserController.show);
routes.post('/', UserController.create);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.destroy);

module.exports = routes;

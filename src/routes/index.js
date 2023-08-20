const routes = require('express').Router();
const userRoutes = require('././user.routes');

routes.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'API rodando!'
    });
});

routes.use('/users', userRoutes);

module.exports = routes

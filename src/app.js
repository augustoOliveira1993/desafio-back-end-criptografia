const express = require('express');
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {AppError} = require('./errors/AppError');

const routes = require('./routes');
const {ValidationError} = require("sequelize");
require('dotenv').config();

module.exports = class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(helmet());
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.server.use('/api/v1', routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            console.log(err)
            if (err instanceof ValidationError) {
                return res.status(400).json({
                    success: false,
                    message: err.message,
                    errors: err.errors
                });

            }
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({
                    success: false,
                    message: err.message
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Error interno do servidor',
                error: err
            });
        });
    }
}

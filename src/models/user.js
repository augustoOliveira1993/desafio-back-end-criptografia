'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {generatorUUID} = require('../utils/helpers');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {

        }
    }

    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: generatorUUID()
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        document: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        credit_card_token: {
            type: DataTypes.TEXT,
            defaultValue: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'Users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    User.beforeCreate((user, options) => {
        user.password = bcrypt.hashSync(user.password, 10);
    })

    return User;
};

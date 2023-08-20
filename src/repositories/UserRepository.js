const {Users, Notifications} = require('../models');

class UserRepository {
    constructor() {
        this.model = Users;
    }

    async create(data) {
        return new Promise((resolve, reject) => {
            this.model.create(data)
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async index() {
        return new Promise((resolve, reject) => {
            this.model.findAll()
                .then((users) => {
                    resolve(users);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async show(id) {
        return new Promise((resolve, reject) => {
            this.model.findByPk(id)
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async update(id, data) {
        return new Promise((resolve, reject) => {
            this.model.update(data, {
                where: {
                    id
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async destroy(id) {
        return new Promise((resolve, reject) => {
            this.model.destroy({
                where: {
                    id
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async findByEmail(email) {
        return new Promise((resolve, reject) => {
            this.model.findOne({
                where: {
                    email
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async findByDocument(document) {
        return new Promise((resolve, reject) => {
            this.model.findOne({
                where: {
                    document
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async saqueBalance(id, amount) {
        return new Promise((resolve, reject) => {
            this.model.update({
                balance: amount
            }, {
                where: {
                    id
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    async depositoBalance(id, amount) {
        return new Promise((resolve, reject) => {
            this.model.update({
                balance: amount
            }, {
                where: {
                    id
                }
            })
                .then((user) => {
                    resolve(user);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
}

module.exports = new UserRepository();

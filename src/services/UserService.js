const UserRepository = require('../repositories/UserRepository');
const {BadRequestError, AppError} = require("../errors/AppError");
const CriptograficaService = require('./CriptograficaService');
class UserService {
    constructor() {
        this.repository = UserRepository;
        this.criptograficaService = CriptograficaService;
    }

    async create(data) {
        const {full_name, email, password, document} = data;
        let errors = [];
        if (!full_name) {
            errors.push({
                field: 'full_name',
                message: 'full_name is required'
            });
        }
        if (!email) {
            errors.push({
                field: 'email',
                message: 'Email is required'
            });
        }

        if (!password) {
            errors.push({
                field: 'password',
                message: 'Password is required'
            });
        }

        if (!document) {
            errors.push({
                field: 'document',
                message: 'Document is required'
            });
        }
        if (errors.length > 0) {
            return {
                success: false,
                errors
            }
        }

        const userEmailExists = await this.repository.findByEmail(email);
        if (userEmailExists) {
            throw new AppError('Email já cadastrado', 400);
        }

        const userDocumentExists = await this.repository.findByDocument(document);
        if (userDocumentExists) {
            throw new AppError('Document já cadastrado', 400);
        }
        const userCreated = await this.repository.create({
            ...data,
            credit_card_token: this.criptograficaService.criptografarString(data.credit_card_token),
            document: this.criptograficaService.criptografarString(data.document.replace(/\D/g, ''))
        });

        return {
            success: true,
            message: 'Usuário cadastrado com sucesso',
            data: await this.repository.show(userCreated.id),
            card_token: await this.descriptoCard(userCreated.credit_card_token),
            document: await this.descriptoCard(userCreated.document)
        }
    }

    async descriptoCard(text) {
        return this.criptograficaService.descriptografarString(text);
    }

    async index() {
        return await this.repository.index()
    }

    async show(id) {
        return await this.repository.show(id)
    }

    async update(id, data) {
        await this.repository.update(id, data)
        return {
            success: true,
            message: 'Usuário atualizado com sucesso'
        }
    }

    async destroy(id) {
        await this.repository.destroy(id)
        return {
            success: true,
            message: 'Usuário deletado com sucesso'
        }
    }
}

module.exports = new UserService();

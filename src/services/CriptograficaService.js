const crypto = require('crypto');

class CriptografiaService {
    constructor() {
        this.algorithm = 'aes-256-cbc'; // Use um algoritmo e um modo de operação adequados às suas necessidades.
        this.key = crypto.randomBytes(32); // Chave secreta de 256 bits (32 bytes)
        this.iv = crypto.randomBytes(16); // Vetor de inicialização de 128 bits (16 bytes)
    }

    // Função para criptografar uma string
    criptografarString(texto) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let criptografado = cipher.update(texto, 'utf-8', 'hex');
        criptografado += cipher.final('hex');
        return criptografado;
    }

    // Função para descriptografar uma string
    descriptografarString(criptografado) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let descriptografado = decipher.update(criptografado, 'hex', 'utf-8');
        descriptografado += decipher.final('utf-8');
        return descriptografado;
    }
}

module.exports = new CriptografiaService();

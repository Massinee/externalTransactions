'use strict'

const log = require('../utils/logUtils');
const cardValidator = require('card-validator');

const validarCartao = async (request, reply) => {
    log.info('Iniciando a função validarCartao');

    const { numero, validade, cvv } = request.body;

    const cardNumberValidation = cardValidator.number(numero);
    const expirationDateValidation = cardValidator.expirationDate(validade);
    const cvvValidation = cardValidator.cvv(cvv);

    console.log("Cartao: ", cardNumberValidation.isValid);
    console.log("Validade: ", expirationDateValidation.isValid);
    console.log("CVV: ", cvvValidation.isValid);

    if (!cardNumberValidation.isValid || !expirationDateValidation.isValid || !cvvValidation.isValid) {
        return reply.status(422).send("Dados Inválidos");
    }

    return reply.status(200).send("Dados Atualizados");
};

module.exports = {
    validarCartao,
};

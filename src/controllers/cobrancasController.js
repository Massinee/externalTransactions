'use strict'

const log = require('../utils/logUtils');
const realizarCobrancaService = require('../services/realizarCobrancaService');

const realizarCobranca = async (request, reply) => {
    log.info("Rota cobrança chamada");

    const { valor, ciclista } = request.body;
    const cobrancaResult = await realizarCobrancaService.realizarCobranca(valor, ciclista);

    return reply.send(cobrancaResult.statusCode).message(cobrancaResult.message);
};

const processarCobrancasEmFila = async (request, reply) => {

    return reply.send(200).message();
};

const incluirCobrancaNaFila = async (request, reply) => {

    return reply.send(200).message();
};

const obterCobranca = async (request, reply) => {

    return reply.send(200).message();
};

module.exports = {
    realizarCobranca,
    processarCobrancasEmFila,
    incluirCobrancaNaFila,
    obterCobranca,
}
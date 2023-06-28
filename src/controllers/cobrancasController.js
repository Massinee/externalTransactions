'use strict'

const log = require('../utils/logUtils');
const realizarCobrancaService = require('../services/realizarCobrancaService');
const historicoCobrancas = require('../historicoCobrancas');

const realizarCobranca = async (request, reply) => {
    log.info("Rota cobrança chamada");

    const { valor, ciclista } = request.body;
    const cobrancaResult = await realizarCobrancaService.realizarCobranca(valor, ciclista);

    return reply.status(cobrancaResult.statusCode).send(cobrancaResult.message);
};

const processarCobrancasEmFila = async (request, reply) => {

    return reply.status().send();
};

const incluirCobrancaNaFila = async (request, reply) => {

    return reply.status().send();
};

const obterCobranca = async (request, reply) => {

    const cobrancaId = request.params.id;

    const cobrancaCiclista = historicoCobrancas.cobrancas.find(c => c.id === cobrancaId);
    if(cobrancaCiclista === undefined){
        return reply.status(404).send('Cobrança não encontrada');
    } else {
        return reply.status(200).send(cobrancaCiclista);
    }
};

module.exports = {
    realizarCobranca,
    processarCobrancasEmFila,
    incluirCobrancaNaFila,
    obterCobranca,
}
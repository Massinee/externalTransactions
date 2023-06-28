'use strict';

const log = require("../utils/logUtils");
const { buildResponse } = require('../services/realizarCobrancaService');
const { devedores } = require('../filaCobranca');

const filaCobranca = async (valor, ciclistaId) => {
    log.info("Iniciando a função para incluir cobrança na fila");
    try {
        const horaSolicitacao = new Date().toISOString();
        const message = await buildResponse("FALHA", valor, ciclistaId, horaSolicitacao);
        devedores.push(message);

        return { statusCode: 200, message };

    } catch (err) {
        return { statusCode: 422, message: "Dados Inválidos" };
    }
};

module.exports = {
    filaCobranca,
}
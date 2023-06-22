'use strict'

const emailSchema = require('./schemas/emailSchema');
const emailService = require('../services/enviarEmailService');
const validaCartaoSchema = require('./schemas/validaCartaoSchema');
const validaCartaoService = require('../services/validaCartaoService');
const { cobrancaSchema, processaCobrancasSchema } = require('./schemas/cobrancasSchema');
const { realizarCobranca, processarCobrancasEmFila, incluirCobrancaNaFila, obterCobranca } = require('../services/cobrancasService');

//POST /enviarEmail -done
//POST /cobranca
//POST /processaCobrancasEmFila - tem cron no cyclic!!
//POST /filaCobranca
//GET /cobranca/{idCobranca}
//POST /validaCartaoDeCredito - done

const routes = async (fastify) => {
    fastify.post('/enviarEmail', emailSchema, emailService.enviarEmail);
    fastify.post('/cobranca', cobrancaSchema, realizarCobranca);
    fastify.post('/processaCobrancasEmFila', processaCobrancasSchema, processarCobrancasEmFila);
    fastify.post('/filaCobranca', cobrancaSchema, incluirCobrancaNaFila);
    fastify.get('/cobranca/:id',  obterCobranca);
    fastify.post('/validaCartaoDeCredito', validaCartaoSchema, validaCartaoService.validarCartao);
};

module.exports = routes;


'use strict'

const emailSchema = require('./schemas/emailSchema');
const emailService = require('../services/enviarEmailService');
const validaCartaoSchema = require('./schemas/validaCartaoSchema');
const validaCartaoService = require('../services/validaCartaoService');

//POST /enviarEmail -done
//POST /cobranca
//POST /processaCobrancasEmFila - tem cron no cyclic!!
//POST /filaCobranca
//GET /cobranca/{idCobranca}
//POST /validaCartaoDeCredito - done

const routes = async (fastify) => {
    fastify.post('/enviarEmail', emailSchema, emailService.enviarEmail);
    fastify.post('/validaCartaoDeCredito', validaCartaoSchema, validaCartaoService.validarCartao);
}

module.exports = routes;
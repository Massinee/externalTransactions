'use strict'

const emailSchema = require('./schemas/emailSchema');
const emailController = require('../controllers/enviarEmailController');
const validaCartaoSchema = require('./schemas/validaCartaoSchema');
const validaCartaoController = require('../controllers/validaCartaoController');
const { cobrancaSchema, processaCobrancasSchema } = require('./schemas/cobrancasSchema');
const cobrancasController = require('../controllers/cobrancasController');
// const { realizarCobranca, processarCobrancasEmFila, incluirCobrancaNaFila, obterCobranca } = require('../controllers/cobrancasController');

//POST /enviarEmail -done
//POST /cobranca
//POST /processaCobrancasEmFila - tem cron no cyclic!!
//POST /filaCobranca
//GET /cobranca/{idCobranca}
//POST /validaCartaoDeCredito - done

const routes = async (fastify) => {
    fastify.post('/enviarEmail', emailSchema, emailController.enviarEmail);
    fastify.post('/cobranca', cobrancaSchema, cobrancasController.realizarCobranca);
    fastify.post('/processaCobrancasEmFila', processaCobrancasSchema, cobrancasController.processarCobrancasEmFila);
    fastify.post('/filaCobranca', cobrancaSchema, cobrancasController.incluirCobrancaNaFila);
    fastify.get('/cobranca/:id',  cobrancasController.obterCobranca);
    fastify.post('/validaCartaoDeCredito', validaCartaoSchema, validaCartaoController.validarCartao);
};

module.exports = routes;




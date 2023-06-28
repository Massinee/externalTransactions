'use strict'

const fastify = require('fastify');
const fastifyRawBody = require('fastify-raw-body');


const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(fastifyRawBody, {
        global: false, // Desabilitar o parsing global de corpo
        runFirst: true, // Executar antes de outros handlers
        parse: (request, _payload, done) => {
            // Definir o corpo como null quando estiver vazio
            if (_payload.length === 0) {
                request.body = null;
            }

            done();
        },
    })
    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/transactionsRoutes'));

    return app;
}

module.exports = {
    build,
}
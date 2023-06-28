'use strict'

const fastify = require('fastify');
const formBody = require('@fastify/formbody');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(formBody, {
        bodyLimit: 0, // Configurar limite do corpo como 0 para permitir corpos vazios
    });
    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/transactionsRoutes'));

    return app;
}

module.exports = {
    build,
}
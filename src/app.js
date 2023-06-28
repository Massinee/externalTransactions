'use strict'

const fastify = require('fastify');
const accepts = require('@fastify/accepts');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(accepts);
    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/transactionsRoutes'));

    return app;
}

module.exports = {
    build,
}
'use strict'

const fastify = require('fastify');
const formBody = require('fastify-formbody');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(formBody);
    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/transactionsRoutes'));

    return app;
}

module.exports = {
    build,
}
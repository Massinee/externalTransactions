'use strict'

const fastify = require('fastify');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.addContentTypeParser('*', (req, done) => {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            // Verificar se o corpo está vazio
            if (data.length === 0) {
                req.body = null;
            } else {
                try {
                    req.body = JSON.parse(data);
                } catch (error) {
                    return done(error);
                }
            }

            done();
        });
    });
    app.register(require('./routes/helloWorldRoute'));
    app.register(require('./routes/transactionsRoutes'));

    return app;
}

module.exports = {
    build,
}
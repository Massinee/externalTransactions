'use strict'

const {handler} = require('../index');

const routes = async (fastify) => {
    fastify.get('/helloWorld', (request, reply) => {
        reply.send({
            response: handler()
        });
    })
}

module.exports = routes;
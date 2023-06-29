'use strict'

const { build } = require('../src/app');
const app = build();

const realizarCobrancaService = require('../src/services/realizarCobrancaService');
const {ciclistas, bodyRequest} = require('./cobrancaCiclistasMock');

const callRealizarCobranca = async (body) => {
    return await app.inject({
        method: 'POST',
        url: '/cobranca',
        body
    })
};

describe('realizar cobrança tests', () => {

    test('Should return 200 when call cobrança route', async () => {
        realizarCobrancaService.realizarCobranca = jest.fn().mockResolvedValueOnce({statusCode: 200, message: "ok"});
        const response = await callRealizarCobranca(bodyRequest);

        expect(response.statusCode).toBe(200);
    })
})
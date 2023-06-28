'use strict'

const { build } = require('../src/app');
const app = build();

const axios = require('axios');
jest.mock('axios');
const stripe = require('stripe');

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

    test('Should return 200 when all credit card validation was made', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({data: ciclistas});
        jest.mock('stripe', () => ({
            customers: jest.fn().mockReturnValue({
                create: jest.fn().mockResolvedValueOnce({ customer: {id: 'cus123'}}),
            }),
        }));

        const response = await realizarCobrancaService.realizarCobranca('10', '2');
        console.log("###############################", response)

        expect(response.statusCode).toBe(200);
    })

})
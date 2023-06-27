'use strict'

const { build } = require('../src/app');
const app = build();

const axios = require('axios');
jest.mock('axios');

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

    test('Should return 200 when realizar cobrança route', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: ciclistas});
        realizarCobrancaService.createCustomer = jest.fn().mockResolvedValueOnce();
        // realizarCobrancaService.addCardToCustomer = jest.fn.mockResolvedValueOnce();
        const response = await callRealizarCobranca(bodyRequest);

        expect(response.statusCode).toBe(200);
    })

    test('Should return 404 when email is not valid', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_verified: 'False'}});
        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(404);
    })

    test('Should return 500 when the sendMail api returns error', async () => {
        nodemailer.createTransport.mockReturnValue({sendMail: jest.fn().mockRejectedValueOnce({ status: 503})});
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_verified: 'True'}});

        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(500);
    })

    test('Should return error message when verifyEmail api returns error', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:500});

        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(500);
    })

    test('Should return 422 when email format is not valid', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_syntax: 'False'}});
        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(422);
    })
})
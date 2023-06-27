'use strict'

const log = require('../utils/logUtils');
const axios = require('axios');
const stripe = require('stripe')('sk_test_51NN4YADiqgi4sgZFfMLPTurD8wFmFLJ9wCZx4GlWEaBJ0FmpEUPvDJpGCLlxHlNOOXwV7jjdqThZ4BZI8GUpy2G900YA5TNuDa');
const uuid = require('uuid');
const enviarEmail = require('../services/enviarEmailService');

const realizarCobranca = async (valor, ciclistaId) => {
    log.info("Iniciando a função realizarCobrança");

    const valorEmCentavos = (valor*100);
    const ciclista = await getCiclistaInfo(ciclistaId);
    const splitDate = ciclista.meioDePagamento.validade.split("-");
    const mes = parseInt(splitDate[1], 10);
    const ano = parseInt(splitDate[0], 10);
    const horaSolicitacao = new Date().toISOString();

    try {
        const customerId = await createCustomer(ciclista.email, ciclista.nome);
        // const tokenId = await createToken('4242424242424242', mes, ano, ciclista.meioDePagamento.cvv);
        const cardId = await addCardToCustomer(customerId, 'tok_visa');
        const charge = await chargeCustomer(customerId, cardId, valorEmCentavos); // Valor em centavos (R$10,00)
        console.log('Pagamento efetuado');

        // await enviarEmail.enviarEmail(ciclista.email, 'Recibo Transação Bicicletário', charge.receipt_url);
        // await enviarEmail.enviarEmail('joaoprferreira@edu.unirio.br', 'Recibo Transação Bicicletário', charge.receipt_url);

        return { statusCode: 200, message: await buildResponse("PAGA", valor, ciclistaId, horaSolicitacao)};

    } catch (err) {
        log.error({
            statusCode: err.statusCode,
            statusMessage: err.message
        }, 'Erro ao chamar Stripe para tarifar o usuário.');
        return { statusCode: 422, message: "Dados Inválidos" };
    }
};

const getCiclistaInfo = async (ciclistaId) => {
    log.info("Acessando banco de ciclistas");
    const ciclistas = await axios.get('https://sore-jade-clownfish-veil.cyclic.app/ciclistas');
    const ciclista = ciclistas.data.find(c => c.id === ciclistaId);
    return {
        nome: ciclista.nome,
        email: ciclista.email,
        meioDePagamento: ciclista.meioDePagamento
    };
};

const createCustomer = async (email, name) => {
    try {
        const customer = await stripe.customers.create({
            email,
            name,
        });

        return customer.id;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao criar o cliente');
    }
};

const addCardToCustomer = async (customerId, tokenId) => {
    try {
        const card = await stripe.customers.createSource(customerId, {
            source: tokenId
        });

        return card.id;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao adicionar o cartão ao cliente');
    }
};

// const createToken = async (cardNumber, expMonth, expYear, cvc) => {
//     try {
//         const token = await stripe.tokens.create({
//
//             card: {
//                 number: cardNumber,
//                 exp_month: expMonth,
//                 exp_year: expYear,
//                 cvc: cvc,
//             },
//         });
//
//         console.log("#$$$$$$$$$$$$", token)
//         return token.id;
//     } catch (error) {
//         console.log(error);
//         throw new Error('Erro ao criar o token');
//     }
// };

const chargeCustomer = async (customerId, tokenId, amount, email) => {
    try {
        return await stripe.charges.create({
            amount: amount,
            currency: 'brl',
            customer: customerId,
            source: tokenId,
        });
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao cobrar o cliente');
    }
};


const buildResponse = async (status, valor, ciclista, horaSolicitacao) => {
    return {
        id: uuid.v4(),
        status,
        horaSolicitacao,
        horaFinalizacao: new Date().toISOString(),
        valor,
        ciclista
    }
};

module.exports = {
    realizarCobranca,
    createCustomer,
    addCardToCustomer,
    chargeCustomer,
}
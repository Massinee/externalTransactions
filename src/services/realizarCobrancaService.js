'use strict'

const log = require('../utils/logUtils');
const axios = require('axios');
const stripe = require('stripe')('rk_test_51NN4YADiqgi4sgZFGFlr7lqM1BW8bMy3W7pi6hOFw4zP3VyLP8T5aATUP1zGDrhYPGVBr51Yq3YlKvoJraqtZxeL002ZPASu2A');
const uuid = require('uuid');

const realizarCobranca = async (valor, ciclistaId) => {
    log.info("Iniciando a função realizarCobrança");

    const cartao = await getCartaoCiclista(ciclistaId);
    const splitDate = cartao.validade.split("-");
    const mes = parseInt(splitDate[1], 10);
    const ano = parseInt(splitDate[0], 10);
    const horaSolicitacao = () => `, "timestamp":"${new Date(Date.now()).toISOString()}`;

    return createPaymentIntent(cartao.numero, mes, ano, cartao.cvv, valor)
        .then((clientSecret) => {
            console.log('Pedido de pagamento criado:', clientSecret);
            return { statusCode: 200, message: buildResponse("PAGA", valor, ciclistaId, horaSolicitacao) };
        })
        .catch((err) => {
            log.error({
                statusCode: err.statusCode,
                statusMessage: err.message
            }, 'Erro ao chamar Stripe para tarifar o usuário.');
            return { statusCode: 422, message: "Dados Inválidos" };
        });
};

const createPaymentIntent = async (numero, mes, ano, cvv, valor) => {
    const valorEmCentavos = (valor*100);
    console.log("###################", typeof mes)
    console.log("###################", typeof ano)
    console.log("###################", {mes, ano})

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: valorEmCentavos,
            currency: 'brl',
            payment_method_types: ['card'],payment_method: 'card',
            source: {
                object: 'card',
                number: "4242424242424242",
                exp_month: mes,
                exp_year: 2026,
                cvc: "123",
            },
        });

        return paymentIntent.client_secret;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getCartaoCiclista = async (ciclistaId) => {
    log.info("Acessando banco de ciclistas");
    const ciclistas = await axios.get('https://sore-jade-clownfish-veil.cyclic.app/ciclistas');
    const ciclista = ciclistas.data.find(c => c.id === ciclistaId);
    return ciclista.meioDePagamento;
};

const buildResponse = (status, valor, ciclista, horaSolicitacao) => {
    return {
        id: uuid.v4(),
        status,
        horaSolicitacao,
        horaFinalizacao: () => `, "timestamp":"${new Date(Date.now()).toISOString()}`,
        valor,
        ciclista
    }
};

module.exports = {
    realizarCobranca,
}
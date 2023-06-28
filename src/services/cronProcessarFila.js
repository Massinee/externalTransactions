'use strict'

const cron = require('node-cron');
const axios = require('axios');

// Definir cron para chamar o endpoint a cada 12 horas '0 */12 * * *'
cron.schedule('*/5 * * * *', () => {
    axios.post('https://gentle-bee-shrug.cyclic.app/processaCobrancasEmFila')
        .then(response => {
            console.log('Endpoint chamado com sucesso!');
            console.log(response.data);
        })
        .catch(error => {
            console.error('Erro ao chamar o endpoint:', error.message);
        });
});

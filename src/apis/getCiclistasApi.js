'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getCiclistas = async () => {
    console.log("Chamando função getCiclistas");
    return axios.get(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas`)
        .then(response  => {
            log.info('Requisição retornada com sucesso');
            console.log("@@@@@#@@ AAAAAAAAAAAAAAAAAAAresponse ", response.data); //so pra vcs terem certeza o que ta voltando
            return response;
        }).catch(err => {
            log.error('Falha no requisição lista de ciclistas');
            console.log("@@@@@@@@ error", err.response);
            return err.response;
        })
}

module.exports = {
    getCiclistas,
}
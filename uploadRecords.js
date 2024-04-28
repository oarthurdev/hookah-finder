const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const fs = require('fs');

// Carregar variáveis de ambiente
dotenv.config();

// Configurar o cliente Algolia
const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

// Ler o arquivo JSON com os registros
const records = JSON.parse(fs.readFileSync('records.json', 'utf8'));

// Enviar registros para o índice Algolia
index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => {
        console.log('Registros enviados com sucesso:', objectIDs);
    })
    .catch(error => {
        console.error('Erro ao enviar registros:', error);
    });

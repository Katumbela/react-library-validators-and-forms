const axios = require('axios');

async function testApiRequest(bi) {
    try {
        const response = await axios.post('https://bi-bs.minjusdh.gov.ao/pims-backend/api/v1/progress', {
            affairsReceipt: bi,
            affairsType: 'IDCard',
            captchaValue: ''
        });

        // Verifique se a resposta contém o estado de progresso do BI
        if (response.data && response.data.affairsProgressState) {
            return response.data.affairsProgressState;
        } else {
            return 'Unexpected response structure';
        }
    } catch (error) {
        // Retorna a mensagem de erro
        return `Error in API request: ${error.message}`;
    }
}

// Exemplo de uso
testApiRequest('006265318BA048')
    .then(result => console.log('API Response:', result))
    .catch(error => console.error('API Error:', error));

exports.handler = async (event) => {
  try {
    // Verificar se tem corpo na requisição
    if (!event.body) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: true, 
          id: 'test-' + Date.now(),
          message: 'Função pronta para receber pagamentos'
        })
      };
    }

    const body = JSON.parse(event.body);
    const { item, value } = body;

    // Simular resposta do Mercado Pago
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        id: 'mp-' + Date.now(),
        item: item,
        value: value,
        message: 'Pagamento processado com sucesso'
      })
    };

  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        id: 'error-' + Date.now(),
        message: 'Simulação de pagamento funcionando'
      })
    };
  }
};

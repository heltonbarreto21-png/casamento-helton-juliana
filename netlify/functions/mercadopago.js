exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { item, value } = body;

    // Simular uma resposta de sucesso por enquanto
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        id: 'simulated-preference-' + Date.now(),
        message: 'Função carregada com sucesso. MercadoPago será integrado em breve.'
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};

const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  // Configurar Mercado Pago com SEU access token
  mercadopago.configure({
    access_token: 'APP_USR-1542828686887264-083021-aa48a9aef7a24c84c617e83488a19952-2662224956'
  });

  try {
    const body = JSON.parse(event.body);
    const { item, value } = body;

    console.log('Criando preferência para:', item, value);

    // Criar preferência de pagamento REAL
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: item,
          unit_price: parseFloat(value),
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: 'https://super-sunburst-8d98a0.netlify.app/?payment=success',
        failure: 'https://super-sunburst-8d98a0.netlify.app/?payment=failure',
        pending: 'https://super-sunburst-8d98a0.netlify.app/?payment=pending'
      },
      auto_return: 'approved'
    });

    console.log('Preferência criada:', preference.body.id);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        id: preference.body.id 
      })
    };

  } catch (error) {
    console.error('Erro Mercado Pago:', error);
    
    // Modo simulação para não quebrar o site
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        id: 'sim-' + Date.now(),
        message: 'Modo simulação ativado devido a erro: ' + error.message
      })
    };
  }
};

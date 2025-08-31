const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  console.log('Função mercadopago chamada');
  
  mercadopago.configure({
    access_token: 'APP_USR-1542828686887264-083021-aa48a9aef7a24c84c617e83488a19952-2662224956'
  });

  try {
    console.log('Corpo da requisição:', event.body);
    const body = JSON.parse(event.body);
    const { item, value } = body;

    console.log('Criando preferência para:', item, value);

    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: item.substring(0, 50), // Limitar título
          unit_price: parseFloat(value),
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: 'https://super-sunburst-8d98a0.netlify.app/success',
        failure: 'https://super-sunburst-8d98a0.netlify.app/failure',
        pending: 'https://super-sunburst-8d98a0.netlify.app/pending'
      },
      auto_return: 'approved'
    });

    console.log('Preferência criada com sucesso:', preference.body.id);
    
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
    console.error('ERRO NO MERCADO PAGO:', error.message);
    console.error('Detalhes do erro:', error);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false,
        error: error.message,
        id: 'sim-' + Date.now()
      })
    };
  }
};

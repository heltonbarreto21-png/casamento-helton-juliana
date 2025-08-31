const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  // Configurar o Mercado Pago com SEU token de produção CORRETO
  mercadopago.configure({
    access_token: 'APP_USR-1542828686887264-083021-aa48a9aef7a24c84c617e83488a19952-2662224956'
  });

  try {
    // Verificar se tem corpo na requisição
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'Dados não fornecidos' 
        })
      };
    }

    const body = JSON.parse(event.body);
    const { item, value } = body;

    // Criar a preferência de pagamento
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        id: preference.body.id 
      })
    };

  } catch (error) {
    console.error('Erro no Mercado Pago:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};

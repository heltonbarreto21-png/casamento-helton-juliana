const mercadopago = require('mercadopago');

exports.handler = async (event) => {
  mercadopago.configure({
    access_token: 'APP_USR-1542828686887264-083021-aa48a9ae7fa24c84c67e5348a9b952-26622249f'
  });

  try {
    const { item, value } = JSON.parse(event.body);

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
        success: 'https://heltonbarreto21-png.github.io/success',
        failure: 'https://heltonbarreto21-png.github.io/failure', 
        pending: 'https://heltonbarreto21-png.github.io/pending'
      },
      auto_return: 'approved'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: preference.body.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

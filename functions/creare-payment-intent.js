// http://localhost:8888/.netlify/functions/creare-payment-intent

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (!event.body)
    return { statusCode: 200, body: 'please create payment intent' }

  const { cart, totalAmount, shippingFee } = JSON.parse(event.body)

  const calculateOrderAmount = () => {
    return totalAmount + shippingFee
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'usd',
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

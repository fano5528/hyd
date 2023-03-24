const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);

export default async function handler(req,res) {
    const body = req.body
    let cart = []
    for (let i = 0; i < body.length; i++) {
        cart.push({price: eval(`body.id${i}`), quantity: eval(`body.quantity${i}`)})
    }
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://hydronaut.mx/api/gracias?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://hydronaut.mx/carrito',
        line_items: cart,
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['MX'],
        },
        phone_number_collection: {
            enabled: true,
        },
    });
    res.redirect(303, session.url);
}
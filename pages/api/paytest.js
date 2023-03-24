const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MgtDbJ8K7osZc8AURKWhwsBvAJKcsECHm70c2APiduYga1r9DlFdNYCR9BRy94zAvS66FL0JCD7i3TsL7QFg63O00ziRwszd1');

export default async function handler(req,res) {
    /*const body = req.body
    let cart = []
    for (let i = 0; i < body.length; i++) {
        cart.push({price: eval(`body.id${i}`), quantity: eval(`body.quantity${i}`)})
    }*/
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://hydronaut.mx',
        cancel_url: 'https://hydronaut.mx/carrito',
        line_items: [
            {
                price: 'price_1Mp388J8K7osZc8AWKgqecR6',
                quantity: 1,
            },
        ],
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
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MgtDbJ8K7osZc8AURKWhwsBvAJKcsECHm70c2APiduYga1r9DlFdNYCR9BRy94zAvS66FL0JCD7i3TsL7QFg63O00ziRwszd1');

export default async function handler(req,res) {
    const body = req.body
    console.log()
    let cart = []
    for (let i = 0; i < body.length; i++) {
        cart.push({price: eval(`body.id${i}`), quantity: eval(`body.quantity${i}`)})
    }
    console.log(cart)
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000/carrito',
        line_items: cart,
        mode: 'payment'
    });
    res.redirect(303, session.url);
}
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MgtDbJ8K7osZc8AURKWhwsBvAJKcsECHm70c2APiduYga1r9DlFdNYCR9BRy94zAvS66FL0JCD7i3TsL7QFg63O00ziRwszd1');

export default async function handler(req,res) {
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000/carrito',
        line_items: [
            {price: "price_1MgtKHJ8K7osZc8AcD2oRKWu", quantity: 1}
        ],
        mode: 'payment'
    });
    res.redirect(303, session.url);
}
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MgtDbJ8K7osZc8AURKWhwsBvAJKcsECHm70c2APiduYga1r9DlFdNYCR9BRy94zAvS66FL0JCD7i3TsL7QFg63O00ziRwszd1');

export default async function handler(req,res) {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
    console.log(session)
    res.status(200).redirect('https://hydronaut.mx/gracias')
}
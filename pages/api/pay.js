const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);

export default async function handler(req,res) {
    res.status(200).json({message: 'ok'})
}
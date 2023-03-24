const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);
import { dbConnect } from '@/lib/dbConnect';
import Order from '@/models/Order';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dbConnect();

export default async function handler(req,res) {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {
        expand: ['line_items'],
        })
    console.log(session)
    console.log(session.line_items.data)
    console.log(typeof session.id)
    const products = session.line_items.data
    const amount = products.length
    let cart = {}
    for(let i = 0; i < amount; i++) {
        cart[products[i].price.id] = products[i].quantity
    }
    Order.create({
        customerName: session.shipping_details.name,
        customerEmail: session.customer_details.email,
        customerPhone: session.customer_details.phone,
        customerAddress: session.shipping_details.address,
        payment: session.amount_total/100,
        products: cart,
        orderId: session.id
    })
    const msg = {
        to: session.customer_details.email,
        from: 'ventas@hydronaut.mx',
        subject: 'Confirmación de tu pedido',
        text: session.shipping_details.name + ',\n\nGracias por tu compra en Hydronaut. Tu pedido ha sido recibido y será procesado en breve.\n\nTu número de pedido es: ' + session.id + '\n\nSi tienes alguna pregunta, por favor no dudes en contactarnos respondiendo a este correo.\n\nSaludos,\n\nHydronaut',
    }
    sgMail.send(msg)
    res.status(200).redirect('https://hydronaut.mx/gracias')
}
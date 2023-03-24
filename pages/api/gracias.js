const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);
import { dbConnect } from '@/lib/dbConnect';
import Order from '@/models/Order';
import Product from '@/models/Product';
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
    let names = {}
    let message = ''
    for(let i = 0; i < amount; i++) {
        cart[products[i].price.id] = products[i].quantity
        let lastStock = Product.findOne({ _id: products[i].price.id })
        Product.findOneAndUpdate({ _id: products[i].price.id }, { inventory: lastStock.inventory - products[i].quantity })
        names[products[i].description] = products[i].quantity
        message += products[i].quantity + 'x '+ products[i].description + '\n'
    }
    const direccion = 'Nombre: ' + session.shipping_details.name + '\n' + 'Correo: ' + session.customer_details.email + '\n' + 'Teléfono: ' + session.customer_details.phone + '\n' + 'Calle y número: ' + session.shipping_details.address.line1 + '\n' + 'Código Postal: ' + session.shipping_details.address.postal_code + '\n' + 'Estado: ' + session.shipping_details.address.state + '\n' + 'Ciudad: ' + session.shipping_details.address.city + '\n' + 'Colonia: ' + session.shipping_details.address.line2
    Order.create({
        customerName: session.shipping_details.name,
        customerEmail: session.customer_details.email,
        customerPhone: session.customer_details.phone,
        customerAddress: session.shipping_details.address,
        payment: session.amount_total/100,
        products: cart,
        orderId: session.id,
        productNames: names,
    })
    const msg = {
        to: session.customer_details.email,
        from: 'ventas@hydronaut.mx',
        subject: 'Confirmación de tu pedido',
        text: session.shipping_details.name + ',\n\nGracias por tu compra en Hydronaut. Tu pedido ha sido recibido y será procesado en breve.\n\nPara confirmar, te estaremos enviando: \n' + message + '\n\n' + 'El pedido se enviará a: \n' + direccion + '\n\nSi tienes alguna pregunta, por favor no dudes en contactarnos respondiendo a este correo.\n\nSaludos,\n\nHydronaut',
    }
    const msg2 = {
        to: 'ops@hydronaut.mx',
        from: 'ventas@hydronaut.mx',
        subject: 'Nuevo pedido',
        text: 'Para enviar: \n' + message + '\n\n' + 'Nombre: ' + session.shipping_details.name + '\n' + 'Correo: ' + session.customer_details.email + '\n' + 'Teléfono: ' + session.customer_details.phone + '\n' + 'Calle y número: ' + session.shipping_details.address.line1 + '\n' + 'Código Postal: ' + session.shipping_details.address.postal_code + '\n' + 'Estado: ' + session.shipping_details.address.state + '\n' + 'Ciudad: ' + session.shipping_details.address.city + '\n' + 'Colonia: ' + session.shipping_details.address.line2  + '\n\n' + 'Total: $' + session.amount_total/100,
    }

    sgMail.send(msg)
    sgMail.send(msg2)
    res.status(200).redirect('https://hydronaut.mx/gracias')
}
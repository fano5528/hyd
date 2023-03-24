const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req,res) {
    const msg = {
        to: 'jose-alfonso@live.com.mx',
        from: 'ventas@hydronaut.mx',
        subject: 'Nuevo pedido',
        text: 'Nuevo pedido',
    }
    sgMail.send(msg)
    res.status(200).json({message: 'ok'})
}
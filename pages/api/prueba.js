import { dbConnect } from '@/lib/dbConnect';
import Order from '@/models/Order';
import Product from '@/models/Product';

dbConnect();

export default async function handler(req,res) {
    const hola = await Product.findOne({id: "price_1Mp388J8K7osZc8AWKgqecR6"});
    console.log(hola);
    res.status(200).json({message: 'ok'})
}
import { dbConnect } from '@/lib/dbConnect';
import Product from '@/models/Product';

dbConnect();

export default async function handler(req,res) {
  const products = await Product.find({});
  switch(req.method) {
    case 'GET':
      try {
        return res.status(200).json(products);
      } catch (error) {
        return res.status(400).json({success: false});
      }
    default:
      res.status(400).json({success: false});
      break;
  }
}
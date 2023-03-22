import { dbConnect } from '@/lib/dbConnect';
import Category from '@/models/Category';

dbConnect();

export default async function handler(req,res) {
  const { id } = req.query;
  const category = await Category.find({id: id});
  console.log(id)
  switch(req.method) {
    case 'GET':
      try {
        return res.status(200).json(category);
      } catch (error) {
        return res.status(400).json({success: false});
      }
    default:
      res.status(400).json({success: false});
      break;
  }
}
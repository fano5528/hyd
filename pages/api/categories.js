import { dbConnect } from '@/lib/dbConnect';
import Category from '@/models/Category';

dbConnect();

export default async function handler(req,res) {
  const categories = await Category.find({});
  switch(req.method) {
    case 'GET':
      try {
        return res.status(200).json(categories);
      } catch (error) {
        return res.status(400).json({success: false});
      }
    case 'POST':
      try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);
      } catch (error) {
        return res.status(400).json({success: false});
      }
    default:
      res.status(400).json({success: false});
      break;
  }   
}
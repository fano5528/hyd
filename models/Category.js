
const mongoose = require('mongoose');
import { models } from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    }
});

export default mongoose.models.category || mongoose.model('category', CategorySchema);
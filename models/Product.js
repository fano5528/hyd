import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgs: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    watts: {
        type: Number,
        required: false
    },
    spectrum: {
        type: Array,
        required: false
    },
    inventory: {
        type: Number,
        required: true
    },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
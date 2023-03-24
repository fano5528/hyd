import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: Object,
        required: true,
    },
    payment: {
        type: Number,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    productNames: {
        type: Array,
        required: true,
    }
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
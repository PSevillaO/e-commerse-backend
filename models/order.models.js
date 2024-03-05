const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },
            price: {
                type: Number,
                require: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'CANCELED '],
        default: 'PENDING'
    }
})

module.exports = mongoose.model("Order", orderSchema);
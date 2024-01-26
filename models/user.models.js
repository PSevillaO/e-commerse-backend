const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 60,
        trim: true,
        validate: {
            validator: function (name) {
                const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
                return regex.test(name);
            }
        }
    },
    email: {
        type: String,
        required: false,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        minlength: 6,
        maxlength: 80,
        validate: {
            validator: function (value) {
                const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/
                return regex.test(value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 70,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 120
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        required: false,
        default: 'USER_ROLE',
        enum: [
            'USER_ROLE',
            'CLIENT_ROLE',
            'ADMIN_ROLE'
        ]
    },
    bornDate:{
        type: Number,
        required: false,
    },
})


module.exports = mongoose.model('User', userSchema) 
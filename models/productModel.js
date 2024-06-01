const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Digite o nome do produto!"]
        },

        quantity: {
            type: Number,
            require: true,
            default: 0
        },

        price: {
            type: Number,
            require: true,                  
        },

        image: {
            type: String,
            require: false,
        }
    },

    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
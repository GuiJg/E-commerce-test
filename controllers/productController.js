const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

//busca todos os produtos
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})

//busca apenas um produto por ID
const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})

//criar/inserir produto novo
const creatProduct = asyncHandler(async (req, res) => {
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})

//Atualizar os atributos dos produtos
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!product) {
            return res.status(404).json({ message: `Não foi possível encontrar nenhum produto do ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})
//deletar um produto por ID
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404);
            throw new Error('Não foi possível encontrar nenhum produto do ID ${id}');
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})

module.exports = {
    getProducts,
    getProduct,
    creatProduct,
    updateProduct,
    deleteProduct
}
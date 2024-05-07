const express = require('express');
const Product = require('../models/productModel')
const {getProducts, getProduct, creatProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const router = express.Router();

// Visualizar os produtos 
router.get('/', getProducts)

// pesquisar produtos por ID
router.get('/:id', getProduct)

// Inserir produtos
router.post('/', creatProduct)

// atualizar os produtos
router.put('/:id', updateProduct)

// deletar os produtos
router.delete('/:id', deleteProduct)

module.exports = router;
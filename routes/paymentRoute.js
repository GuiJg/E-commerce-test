const express = require('express');
const axios = require('axios');
const Product = require('../models/productModel'); // Certifique-se de que o caminho está correto

const router = express.Router();

// Rota para criar a preferência de pagamento
router.post('/criar-preferencia/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(`Buscando produto com ID: ${productId}`); // Log para depuração
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ error: 'Produto não encontrado' });
        }

        const preference = {
            items: [
                {
                    title: product.name,
                    quantity: 1, 
                    currency_id: 'BRL',
                    unit_price: product.price,
                },
            ],
            back_urls: {
                success: 'https://e-commerce-test-react-vite.vercel.app/',
            },
        };

        console.log('Criando preferência de pagamento com os seguintes dados:', preference); // Log para depuração

        const response = await axios.post(
            'https://api.mercadopago.com/checkout/preferences',
            preference,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer TEST-8354292579455022-052214-45b7b6532704c122d9a6f33f81c23a3b-627608118`, // Certifique-se de que o token está correto
                },
            }
        );

        console.log('Resposta do Mercado Pago:', response.data); // Log para depuração
        res.json({ init_point: response.data.init_point });
    } catch (error) {
        console.error('Erro ao criar a preferência de pagamento:', error); // Log para depuração
        res.status(500).send({ error: 'Erro ao criar a preferência de pagamento' });
    }
});

module.exports = router;

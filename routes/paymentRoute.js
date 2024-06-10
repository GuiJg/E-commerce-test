const express = require('express');
const axios = require('axios');
const Product = require('../models/productModel');
require('dotenv').config();

const router = express.Router();

router.post('/criar-preferencia/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(`Buscando produto com ID: ${productId}`);
        const product = await Product.findById(productId);
        const user = req.params.user;

        if (!product) {
            return res.status(404).send({ error: 'Produto não encontrado' });
        }

        // if (!user) {
        //     return res.status(404).send({ error: 'Usuário não encontrado' });
        // }

        if (!product.price || !product.name) {
            return res.status(400).send({ error: 'Dados do produto inválidos' });
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

        console.log('Criando preferência de pagamento com os seguintes dados:', preference);

        const response = await axios.post(
            'https://api.mercadopago.com/checkout/preferences',
            preference,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
                },
            }
        );

        console.log('Resposta do Mercado Pago:', response.data);
        res.json({ sandbox_init_point: response.data.sandbox_init_point, preference_id: response.data.id });

    } catch (error) {
        console.error('Erro ao criar a preferência de pagamento:', error);
        if (!res.headersSent) {
            res.status(500).send({ error: 'Erro ao criar a preferência de pagamento' });
        }
    }
});

module.exports = router;

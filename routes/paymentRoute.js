const express = require('express');
const axios = require('axios');
const Product = require('../models/productModel');

const router = express.Router();

router.post('/criar-preferencia/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(`Buscando produto com ID: ${productId}`);
        const product = await Product.findById(productId);
        const user = req.params.user

        if (!product) {
            return res.status(404).send({ error: 'Produto não encontrado' });
        }

        // if (!user) {
        //     return res.status(404).send({ error: 'Usuário não encontrado' });
        // }

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
        // // Crie o objeto de pagamento antes de enviar a resposta
        // const payment = new Payment({
        //     amount: product.price,
        //     user: req.user._id,
        // });

        // // Aguarde o salvamento do pagamento
        // await payment.save();
        
        // Envie a resposta ao cliente depois que todas as operações assíncronas foram concluídas
        res.json({ sandbox_init_point: response.data.sandbox_init_point });

    } catch (error) {
        console.error('Erro ao criar a preferência de pagamento:', error);
        // Certifique-se de que uma resposta de erro seja enviada apenas se nenhuma resposta foi enviada ainda
        if (!res.headersSent) {
            res.status(500).send({ error: 'Erro ao criar a preferência de pagamento' });
        }
    }
});

module.exports = router;
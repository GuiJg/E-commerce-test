const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    console.log('Rota de registro acessada');
    const { name, email, password } = req.body;
    console.log('Dados recebidos:', { name, email, password });
    try {
        console.log('Iniciando processo de registro...');
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'o Usuário ' + user.name + ' já existe' });
        }

        user = new User({ name, email, password });
        console.log('Usuário criado:', user);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'b5f23c9a2fc6e94f1a597ad83c29fe3e3f580ef4', { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Erro ao gerar token JWT:', err);
                return res.status(500).json({ error: 'Erro ao gerar token JWT' });
            }
            console.log('Token gerado com sucesso:', token);
            res.json({ token });
        });
    } catch (error) {
        console.error('Erro durante o registro:', error);
        res.status(500).send('Erro no servidor');
    }
});

router.post('/login', async (req, res) => {
    console.log('Rota de login acessada');
    const { email, password } = req.body;
    console.log('Dados recebidos:', { email, password });

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Erro ao gerar token JWT:', err);
                return res.status(500).json({ error: 'Erro ao gerar token JWT' });
            }
            console.log('Token gerado com sucesso:', token);
            res.json({ token });
        });
    } catch (error) {
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;
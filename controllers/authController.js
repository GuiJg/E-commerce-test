const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/user'); 

exports.register = async (req, res) => {
    console.log('Função de registro chamada');
    try {
        const { name, email, password } = req.body;
        console.log('Dados recebidos:', { name, email, password });

        let user = await User.findOne({ email });
        if (user) {
            console.log('Usuário já existe:', user);
            return res.status(400).json({ error: 'Este email já está cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({ name, email, password: hashedPassword });
        console.log('Usuário criado:', user);

        await user.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro durante o registro:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

exports.login = async (req, res) => {
    console.log('Função de login chamada');
    try {
        const { email, password } = req.body;
        console.log('Dados recebidos:', { email, password });

        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuário não encontrado:', email);
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Senha incorreta para o usuário:', email);
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
        console.log('Token gerado com sucesso:', token);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

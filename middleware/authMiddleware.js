const jwt = require('jsonwebtoken');
const JWT_SECRET = 'b5f23c9a2fc6e94f1a597ad83c29fe3e3f580ef4';

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ msg: 'Token expirado' });
        }

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ msg: 'Token inválido' });
        }

        req.user = { id: decoded.userId };
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ msg: 'Token inválido' });
    }
}; 

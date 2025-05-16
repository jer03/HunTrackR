const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ error: 'Authorization header missing' });

        const [scheme, token] = header.split(' ');
        if (scheme !== 'Bearer' || !token) return res.status(401).json({ error: 'Invalid authorization format' });

        const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = { id: payload.id, email: payload.email };
        next();
    } catch (err) {
        console.error('Auth error:', err);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

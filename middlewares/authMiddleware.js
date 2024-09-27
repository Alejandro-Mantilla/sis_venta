const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del encabezado

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Guardar información del usuario en la solicitud
        next(); // Pasar al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;
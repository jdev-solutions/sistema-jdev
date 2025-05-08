const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const publicPaths = ['/login'];

  if (publicPaths.includes(req.path) && req.method === 'POST') {
    return next(); // Permite POST /login
  }

  const token = req.signedCookies.token || req.headers['authorization'];

  console.log('Middleware isAuthenticated chamado para:', req.originalUrl);

  if (!token) {
    console.log('Usuário não autenticado, redirecionando para /login');
    return res.redirect('/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token inválido:', err);
      return res.redirect('/login');
    }
    req.user = decoded;
    console.log('Usuário autenticado:', req.user);
    next();
  });
};

module.exports = isAuthenticated;
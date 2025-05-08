require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const isAuthenticated = require('./middleware/auth'); // Importe o middleware
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var produtosRouter = require('./routes/produtos');
var comprasRouter = require('./routes/compras');

const db = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET)); // Adicione a chave secreta no .env para maior segurança
app.use(express.static(path.join(__dirname, 'public')));

// ROTA DE LOGIN (PÚBLICA)
app.get('/login', (req, res) => {
  const token = req.signedCookies.token || req.headers['authorization'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.render('login');
      }
      return res.redirect('/produtos'); // ✅ Redireciona para uma página real e útil
    });
  } else {
    res.render('login');
  }
});

// ROTA LOGIN POST (PÚBLICA)
app.use('/login', loginRouter); 

// ⛔ MIDDLEWARE APLICADO APENAS AQUI
app.use(isAuthenticated);

// ROTAS PROTEGIDAS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produtos', produtosRouter);
app.use('/compras', comprasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.sync({ force: false }) // force: false evita recriar tabelas existentes
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });

module.exports = app;
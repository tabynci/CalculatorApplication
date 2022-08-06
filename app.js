var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var csrf = require('csurf');

var indexRouter = require('./routes/index');

var app = express();
var csrfProtection = csrf({ cookie: true })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    res.set('X-Content-Type-Options', 'nosniff')
  }
}));

app.use(csrf({cookie:{key:'XSRF-TOKEN',path:'/', secure: true, httpOnly: true, sameSite: 'lax'}}));

app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
  });
  res.locals.csrftoken = req.csrfToken();
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

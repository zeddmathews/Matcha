var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var connection = require('./dbc').connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var chatRouter = require('./routes/chat');

var app = express();

const session = expressSession({
	secret: 'much secret',
})

const loginRedirect = (req, res, next) => {
	if (!req.session.userID) {
		res.redirect('login');
	}
	else {
		next();
	}
};

const loggedInRedirect = (req, res, next) => {
	if (req.session.userID) {
		res.redirect('index');
	}
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

app.use('/', indexRouter);
app.use('/users', /*loginRedirect,*/ usersRouter);
app.use('/login', /*loggedInRedirect,*/ loginRouter);
app.use('/signup', /*loggedInRedirect,*/ signupRouter);
app.use('/profile', /*loginRedirect,*/ profileRouter);
app.use('/chat', /*loginRedirect,*/ chatRouter);

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
	if (res.status === 404) {
		res.render('404', { title : '404' });
	}
	else if (500) {
		res.render('500', { title : '500' });
	}
});

module.exports = app;
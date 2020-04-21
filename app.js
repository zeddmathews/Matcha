var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');

var db = require('./dbc').connection;

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
		res.render('login', {loginStatus : 'logged_out'});
	}
	else {
		next();
	}
};

const loggedInRedirect = (req, res, next) => {
	if (req.session.userID) {
		res.render('index', {loginStatus : 'logged_in'});
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
app.use('/users', loginRedirect, usersRouter);
app.use('/login', loggedInRedirect, loginRouter);
app.use('/signup', loggedInRedirect, signupRouter);
app.use('/profile',loginRedirect, profileRouter);
app.use('/chat', loginRedirect, chatRouter);

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
		res.render('404');
	}
	else {
		res.render('500');
	}
});

module.exports = app;
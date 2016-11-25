var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var hash = require('bcrypt-nodejs');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;


app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

var routes = require('./routes/api.js');

Genre = require('./models/genre');
Book = require('./models/book');
User = require('./models/user.js');

Genre = require('./models/genre');
Book = require('./models/book');

//З'єднання з mongoose
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://vaalel:hatake1996@ds111188.mlab.com:11188/book_manager';
  mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// конфігурування passport.js
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// роути
app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

module.exports = app;

app.get('/', function (req, res) {
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function (req, res) {
  Genre.getGenres(function (err, genres) {
    if(err){
      throw err;
    }
    res.json(genres);
  });
});

app.post('/api/genres', function (req, res) {
  var genre = req.body;
  Genre.addGenre(genre, function (err, genre) {
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

app.put('/api/genres/:_id', function (req, res) {
  var id = req.params._id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {},  function (err, genre) {
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

app.post('/api/books', function (req, res) {
  var book = req.body;
  Book.addBook(book, function (err, book) {
    if(err){
      throw err;
    }
    res.json(book);
  });
});

app.get('/api/books', function (req, res) {
  Book.getBooks(function (err, books) {
    if(err){
      throw err;
    }
    res.json(books);
  });
});

app.get('/api/books/:_id', function (req, res) {
  Book.getBookById(req.params._id, function (err, book) {
    if(err){
      throw err;
    }
    res.json(book);
  });
});

app.put('/api/books/:_id', function (req, res) {
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {},  function (err, book) {
    if(err){
      throw err;
    }
    res.json(book);
  });
});

app.delete('/api/genres/:_id', function (req, res) {
  var id = req.params._id;
  Genre.removeGenre(id,  function (err, genre) {
    if(err){
      throw err;
    }
    res.json(genre);
  });
});

app.delete('/api/books/:_id', function (req, res) {
  var id = req.params._id;
  Book.removeBook(id,  function (err, book) {
    if(err){
      throw err;
    }
    res.json(book);
  });
});
app.listen(3000);
console.log('Running on port 3000');

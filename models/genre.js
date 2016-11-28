var mongoose = require('mongoose');

//Схема жанрів
var genreSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);
//Отримання жанрів
module.exports.getGenres = function (callback, limit) {
  Genre.find(callback).limit(limit);
};

//Додавання жанрів
module.exports.addGenre = function (genre, callback) {
  Genre.create(genre, callback);
};

//Оновлення жанрів
module.exports.updateGenre = function (id, genre, options, callback) {
  var query = {_id: id};
  var update = {
    name: genre.name
  }
  Genre.findOneAndUpdate(query, update, options, callback);
};

//Видалення жанрів
module.exports.removeGenre = function (id, callback) {
  var query = {_id: id};
  Genre.remove(query,callback);
};

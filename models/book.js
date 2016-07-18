var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = mongoose.Schema({
  title: String,
  author: String
});

var Book = mongoose.model('Book', bookSchema);

var hunger = new Book({title:'The Hunger Games', author: 'lady'});


module.exports = Book;

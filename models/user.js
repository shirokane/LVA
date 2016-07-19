var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  title: {required : 'true', type : String},
  author: {required : 'true', type : String},
});

var User = mongoose.model('Book', bookSchema);


module.exports = User;

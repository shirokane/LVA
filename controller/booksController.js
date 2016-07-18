var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    database = require('../config/database.js'),
    Book = require('../models/book.js');

var page = {
  title: "Library Assistant"
}

//retrieves documents and sets index
router.get('/', function(req,res){
  Book.find({}, function (err,books){
    if(err){console.log('Books not found??? ' + err);}
    console.log(books);
    res.render('index', {
      title: page.title,
      list: books
    });
  });
});

router.get('/:id/edit', function(req,res){

});



//sets submit pagee
router.get('/submit', function(req,res){
  res.render('submit', {title: 'submit a book'});
});

//sets delete page and list of books
router.get('/delete', function(req,res){
    Book.find({}, function (err,books){
      if(err){console.log('Books not found??? ' + err);}
      console.log(books);
      res.render('delete', {
        title: page.title,
        list: books
      });
    });
});


//saves new books
router.post('/submit', function (req, res){
  var posted = req.body;
  console.log(posted);
  var newBook = new Book({
    title: posted.title,
    author: posted.author
  });

  newBook.save(function (err){
    if(err) throw err;
    console.log('Book Submitted!');
  });
    res.redirect('/');
});



//deletes books
router.post('/delete', function(req,res){
  var posted = req.body;
  console.log(posted);

  Book.findOneAndRemove({ title: res}, function (err,book){
    if(err){console.log('Books not found??? ' + err)}

    Book.remove(function(err){
      if (err) throw err;
      console.log('User deleted');
    });
    res.redirect('/delete');
  });

});






module.exports = router;

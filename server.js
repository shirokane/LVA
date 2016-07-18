var express = require('express'),
   app = express(),
   mongoose = require('mongoose'),
   port = process.env.PORT || 8080,
   database = require('./config/database.js'),
   morgan = require('morgan'),
   bodyParser = require('body-parser'),
   methodOverride = require('method-override');
   Book = require('./models/book.js');
   books = require('./controller/booksController');

   mongoose.connect(database.url, function (err,res){
     if (err){console.log('Error Connecting to:' + database.url + "\n" + err);}
     else{console.log('Connection Successful.');}
   });


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname+"/public"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vdn.api+json'}));
app.use(methodOverride());

app.use('/', books);

app.listen(port);
console.log("Listening on port" + port);

var db = mongoose.connection;

// Book.find(function (err, books){
//   if(err) return console.error(err);
//   console.log(books);
// });

// hunger.save(function (err, hunger){
//   if(err) return console.error(err);
//   console.log(hunger + " check")
// });

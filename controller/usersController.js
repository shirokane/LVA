var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    database = require('../config/database.js'),
    User = require('../models/user.js');
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

    function encrypt(text){
      var cipher = crypto.createCipher(algorithm,password)
      var crypted = cipher.update(text,'utf8','hex')
      crypted += cipher.final('hex');
      return crypted;
    }

    function decrypt(text){
      var decipher = crypto.createDecipher(algorithm,password)
      var dec = decipher.update(text,'hex','utf8')
      dec += decipher.final('utf8');
      return dec;
    }

    router.get('/signUp', function(req,res){
      res.render('signUp');
      User.find({}, function (err,users){
        if(err){console.log(err);}
          for(var i = 0; i < users.length; i++){
            console.log(users[i].email + ":: " + users[i].password);
          }
      });
    });

    router.get('/login', function(req,res){
      res.render('login');
      User.find({}, function (err,users){
        if(err){console.log(err);}
          for(var i = 0; i < users.length; i++){
            console.log(users[i].email + ":: " + users[i].password);
          }
      });
    })

    router.post('/signUp', function(req,res){
      var posted = req.body;
      var newUser = new User({
        email: posted.email,
        password: encrypt(posted.password)
      });


      newUser.save(function (err){
        if(err) throw err;

      });
        res.redirect('/login');
    });

    module.exports = router;

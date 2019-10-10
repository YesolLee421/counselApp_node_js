// routes/index.js
var express = require('express');
var app = express();


module.exports = function(app, User)
{
    
    var User = require('../Model/User.js');
    
    // GET ALL Users
    app.get('/api/users', function(req,res){
        res.end();
        
    });

    // GET - login
    app.get('/login', function(req, res){
        res.end();
        
    });

    // GET BOOK BY AUTHOR
    // app.get('/api/books/author/:author', function(req, res){
    //     res.end();
    // });

    // REGISTER USER
    app.post('/register', function(req, res){
        // req err처리 필요 + req id 검사해서 중복안되게 처리 필요

        var User = require('../Model/User.js');

        var userid = req.body.id;
        var password = req.body.pw;

        User.findOne({id: req.body.id}, function(err, user){
            if(err){
                console.error(err);
                return next(err);
            }
            if(user){
                res.json(req.body.id+"는 중복된 id입니다.");
                console.log(req.body.id+"는 중복된 id입니다.")
            }else{
                var user = new User();
                user.id = req.body.id;
                //password 암호화 필요
                user.pw = req.body.pw;
                user.salt = "";
                user.name = req.body.name;
                user.type = req.body.type;
    
                user.save(function(err, user){
                    if(err) return console.error(err);
                    res.json(req.body.name+"저장 성공");
                    console.log(req.body.name+"저장 성공");
                });
            }
        });
        
    });

    // UPDATE THE User info
    app.put('/profile/change', function(req, res){
        res.end();
        
    });

    // DELETE User
    app.delete('/leave', function(req, res){
        res.end();
        
    });

}
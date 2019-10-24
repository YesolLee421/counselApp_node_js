// routes/index.js
// var express = require('express');
// var app = express();

const express = require("express");
const Post = require("../Model/post");
const homeRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../Model/User');

//  사실은 /home이라고 하고 express.static? 같은거로 주소 고정해야할듯

homeRouter.get('/',(req, res)=>{

    // 숫자 세면 0개로 나오는데 find()로 하면 null 이 아닌가보다.
    Post.estimatedDocumentCount((err, number)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(number!=0){
            res.json(`게시물 ${number} 개`);
            console.log(`게시물 ${number} 개`);
        }else{
            res.send("게시물이 하나도 없습니다.");
            console.log("게시물이 하나도 없습니다.");
        }
    });
    //res.json('홈화면 입장');

    // User.find((err, users)=>{
    //     if(err){
    //         console.error(err);
    //         return next(err);
    //     }
    //     if(users){
    //         res.json(users);
    //         console.log(users);
    //     }else{
    //         res.send("유저가 없습니다");
    //         console.log('No Users');
    //     }
    // });

    // Post.find()
    // .then((posts)=>{
    //     res.json(posts);
    // })
    // .catch((error)=>{
    //     console.error(error);
    //     next(error);
    // });  

    // Post.find((err, post)=>{
    //     if(err){
    //         console.error(err);
    //         return next(err);
    //     }
    //     if(post!=[]){
    //         res.json(post);
    //         console.log(post);
    //     }else{
    //         res.send("게시물이 하나도 없습니다.");
    //         console.log("게시물이 하나도 없습니다.");
    //     }
    // });
       

});

module.exports = homeRouter;

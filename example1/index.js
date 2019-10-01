// import packages
var mongodb = require('mongodb');
var ObjectIDB = mongodb.ObjectID;
var crypto = require('crypto');
var express = require('express')
var bodyparser = require('body-parser');

// password utils
// create fun to random string
var getRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') // convert to hexa format
        .slice(0,length);
}

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    }
}

function saltHashPassword(password){
    var salt = getRandomString(16); // 랜덤 16개 글자 생성
    var passwordData = sha512(password,salt); //새로운 비번 생성해서 반환
    return passwordData;
}

function chechHashPassword(userPassword,salt){
    var passwordData = sha512(userPassword,salt)
    return passwordData;
}

// Create Express Service
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Create MongoDB client
var MongoClient = mongodb.MongoClient;

// Connection URL
var url = "mongodb://127.0.0.1:27017" // default port
MongoClient.connect(url,{useNewUrlParser: true},function(err,client){
    if(err)
        console.log('db 연결 실패',err);
    else{
        /* Register
        1. 유저 request로부터 params 받기: name, id, pw, type
        2. pw->random salt, hash->salt, hash 한 pw를 db에 저장
        */
        app.post('/register',(request,response,next)=>{
            var post_data = request.body;
            var original_pw = post_data.password;
            var hash_data = saltHashPassword(original_pw);
            var password = hash_data.passwordHash; // pw hash 저장
            var salt = hash_data.salt; // pw salt 저장

            var id = post_data.id;
            var name = post_data.name;
            var type = post_data.type;

            var insertJson = {
                "id":id,
                "pw":password,
                "salt":salt,
                "name":name,
                "type":type
            };
            var db = client.db('counselApp') //db 이름

            // email (회원) 존재 여부 체크
            db.collection('users')
                .find({"id":id}).count(function(err,number){
                    if(number !=0){
                        response.json("이미 존재하는 id입니다.");
                        console.log("이미 존재하는 id입니다.");
                    }else{
                        // insert data
                        db.collection('users')
                            .insertOne(insertJson,function(err,res){
                                response.json("회원가입 성공");
                                console.log("회원가입 성공");
                            })
                    }
                })
        });
        
        /* Login endpoint
        1. 유저 request로부터 정보 받기 완료
        2. email 기준으로 salt 받기
        3. hash pw같으면 로그인 성공
        */
       app.post('/login',(request,response,next)=>{
        var post_data = request.body;

        var original_pw = post_data.password;
        var id = post_data.id;
        var name = post_data.name;
        var type = post_data.type;

        var db = client.db('counselApp') //db 이름

        // email (회원) 존재 여부 체크
        db.collection('users')
            .find({"id":id}).count(function(err,number){
                if(number == 0){
                    response.json("회원정보가 없습니다");
                    console.log("회원정보가 없습니다");
                }else{
                    // insert data
                    db.collection('user')
                        .findOne({"id":id},function(err,user){
                            var salt = user.salt; // user에서 salt 뽑기
                            var hashed_pw = chechHashPassword(original_pw,salt).passwordHash;
                            // salt로 원래 패스워드를 hash화한다
                            var encrypted_pw = user.pw;
                            if(hashed_pw == encrypted_pw){
                                response.json(user.name+ "님, 환영합니다.");
                                console.log(user.name+ "님, 환영합니다.");
                            }else{
                                response.json("비밀번호가 틀렸습니다");
                                console.log("비밀번호가 틀렸습니다");
                            }

                        })
                }
            })
    });
        // web server start
        app.listen(3000,()=>{
            console.log("Mongodb connect success, webserver port 3000")
        })
    }
})
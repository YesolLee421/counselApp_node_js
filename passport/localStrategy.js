const LocalStrategy = require("passport-local").Strategy;
const User = require('../Model/User');
const bcrypt = require('bcrypt');

module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pw',
        session: true,
    }, async (email, pw, done)=>{
        try{
            const exUser = await User.findOne({email});
            console.log(`exUser=${exUser}`);
            if(exUser){
                const isMatch = await bcrypt.compare(pw, exUser.pw);
                console.log(`isMatch=${isMatch}`);
                if(isMatch){
                    return done(null, exUser, {message: '로그인 성공'});
                } else {
                    
                    return done(null, false, {message: '비밀번호가 틀렸습니다.'});
                }
            } else {
                return done(null, false, {message:'존재하지 않는 아이디입니다.'});
            }

        }catch(error){
            console.error(error);
            return done(error);
        }
    }));
};
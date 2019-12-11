// 로그인 되어있는지 체크
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
};

// 로그인 하기 전인지 체크
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
};

// 랜덤한 숫자 발생
exports.getRandomString = (length)=>{
  return crypto.randomBytes(Math.ceil(length/2))
      .toString('hex') // convert to hexa format
      .slice(0,length);
};


exports.sha512 = (pw, salt)=>{
  const hash = crypto.createHmac('sha512',salt);
  hash.update(pw);
  const value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  }
};

exports.saltHashPassword = (password)=>{
  var salt = getRandomString(16); // salt=랜덤 16개 글자 생성
  var passwordData = sha512(password,salt); //소금뿌린 새로운 비번 생성해서 반환
  return passwordData;
};

exports.chechHashPassword = (userPassword,salt)=>{
  var passwordData = sha512(userPassword,salt)
  return passwordData;
};
const fs = require('fs'); // const(상수), var로 해도 문제없음
fs.readFile('node/sample.txt','utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
});


var http = require('http');
var fs = require('fs'); //파일 시스템 모듈
var url = require('url'); //url 모듈 사용할 것을 node.js에 알려줌

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var title = queryData.id;
    

    if(_url == '/'){
        title = "welcome";
        //_url = '/index.html';
    }
    if(_url == '/favicon.ico'){
    // return response.writeHead(404); 여기서 변경
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    fs.readFile(`data/${title}`,'utf8', (err,description)=>{
        if(err) throw err;
        var template = `
    <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ul>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
  </ul>
  <h2>${title}</h2>
  ${description}
</body>
</html>

    `;
    response.end(template); //사용자에게 전달하는 정보 바꾸기

    })
    
    //console.log(__dirname + url);
    //response.end(template); //사용자에게 전달하는 정보 바꾸기
    //response.end(fs.readFileSync(__dirname + _url));
 
});
app.listen(3000);
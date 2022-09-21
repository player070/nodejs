const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb+srv://qjin:Gorillaz-66@cluster0.xaphkkg.mongodb.net/?retryWrites=true&w=majority',function(오류,client){
  db = client.db('todoapp');
  app.listen(8080, function(){console.log('8008 connected!');});
});

app.get('/',function(요청,응답){응답.sendFile(__dirname + '/index.html')});
app.get('/signin',function(요청,응답){응답.sendFile(__dirname + '/signin.html')});
app.get('/write',function(요청,응답){응답.sendFile(__dirname + '/write.html')});




app.post('/addProfile',function(요청,응답){
  db.collection('counter').findOne({name:'회원수'},function(에러,결과){
    var 회원수 = 결과.totalPost;
    db.collection('posttest').insertOne({_id : 회원수 + 1 ,username : 요청.body.username, gender : 요청.body.gender, e_id : 요청.body.e_id, e_address : 요청.body.e_address},function(){
      console.log('profile저장완료');
    });
    // counter라는 콜렉션에 있는 totalpost라는 항목도 1 증가시켜야한다.
  });
  응답.sendFile(__dirname + '/signin.html');
});

app.post('/addtodo',function(요청,응답){
  db.collection('counter').findOne({name:'할일수'},function(에러,결과){
    var 할일수 =  결과.totalTodo;
    db.collection('post').insertOne({_id : 할일수 + 1 , 제목 : 요청.body.title, 날짜 : 요청.body.date},function(){
      console.log('todo저장완료');
    });
  });
});


app.get('/list',function(요청,응답){
  db.collection('post').find().toArray(function(에러,결과){
    응답.render('list.ejs',{profiles : 결과});
  });
});

app.get('/profile',function(요청,응답){
  db.collection('posttest').find().toArray(function(에러,결과){
    응답.render('profile.ejs',{profiles : 결과});
  });
});

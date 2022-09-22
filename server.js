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

      // counter라는 콜렉션에 있는 totalpost라는 항목도 1 증가시켜야한다.
      db.collection('counter').updateOne({name:'회원수'},{ $inc : {totalPost:1}},function(에러, 결과){});
    });    
  });
  응답.sendFile(__dirname + '/index.html')
});


// /write 를 통해 /addtodo에 post로 정보를 보낸다. 
// id를 관리하는 collection명은 'counter', id는 'totalTodo', 식별자는 name : '할일수'
// todo 정보를 입력하는 collection 명은 'post'
// 보내는 내용 : 제목 : title, 날짜 : date
// 정보를 보낸 뒤에 totalTodo의 값을 1 올려준다. 


app.post('/addtodo',function(요청, 응답){
  db.collection('counter').findOne({name : '할일수'},function(에러, 결과){
    var 할일수 = 결과.totalTodo;
    db.collection('post').insertOne({_id : 할일수 + 1 , 제목 : 요청.body.title, 날짜 : 요청.body.date},function(){
      db.collection('counter').updateOne({name:'할일수'},{ $inc : {totalTodo : 1}},function(에러, 결과){});
    });
  });
  응답.sendFile(__dirname + '/write.html')
});


app.get('/list',function(요청,응답){
  db.collection('post').find().toArray(function(에러,결과){
    응답.render('list.ejs',{todos : 결과});
  });
});

app.get('/profile',function(요청,응답){
  db.collection('posttest').find().toArray(function(에러,결과){
    응답.render('profile.ejs',{profiles : 결과});
  });
});

app.delete('/deleteTodo',function(요청, 응답){
  console.log(요청.body);
  요청.body._id = parseInt(요청.body._id);
  //요청.body에 담긴 게시물 번호에 따라 db에서 게시물 삭제 
  db.collection('post').deleteOne(요청.body, function(에러, 결과){
                      //deleteOne({어떤요소를 찾아서 delete할지},function(){})
    if(에러){
      응답.status(400).send({ message : '실패'}); //서버에서 응답코드 400(실패)을 보낸다.
    }else{
      응답.status(200).send({ message : '성공'}); //서버에서 응답코드 200(성공)을 보낸다.
    }
  })
})

app.get('/detail/:id',function(요청,응답){
  db.collection('post').findOne({_id : 1},function(에러, 결과){
    console.log(결과)

    응답.render('detail.ejs',{데이터명 : 데이터정보})
  })
})
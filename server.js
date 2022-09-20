// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser'); //서버요청을 쉽게 꺼내서 쓸 수 있는 라이브러리. 
// app.use(bodyParser.urlencoded({extended : true})); // ↑사용하기. 

// app.set('view engine','ejs')


// // mongoDB접속
// const MongoClient = require('mongodb').MongoClient;
// var db;
// MongoClient.connect('mongodb+srv://qjin:Gorillaz-66@cluster0.xaphkkg.mongodb.net/?retryWrites=true&w=majority',function(에러, client){
  
//   if(에러){return console.log(에러)};

//   db = client.db('todoapp'); //todoapp 이라는 database 폴더에 연결한다

//   app.listen(8080, function(){
//     console.log("listening on 8080")
//   });

// });
ㅇ
// app.get('/',function(요청,응답){
//   응답.sendFile(__dirname + '/index.html');
// }); 

// app.get('/write',function(요청,응답){
//   응답.sendFile(__dirname + '/write.html');
// });

// app.post('/add', function(요청, 응답){
//   응답.send('전송완료');
//   db.collection('post').insertOne({ 제목 : 요청.body.title , 날짜 : 요청.body.date}, function(에러, 결과){
//     console.log('제목 : ' + 요청.body.title + ', 날짜 : ' + 요청.body.date);
//   });
// })

// app.get('/list',function(요청, 응답){

//   // db에 저장된 post collection 의 데이터를 꺼내달라. 
//   db.collection('post').find().toArray(function(에러, 결과){
//     응답.render('list.ejs', {posts : 결과});
//   });
// });

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://qjin:Gorillaz-66@cluster0.xaphkkg.mongodb.net/?retryWrites=true&w=majority',function(오류,client){
  db = client.db('todoapp');
  app.listen(8000, function(){
    console.log('connected 8000!');
  });
});

app.post('/add',function(요청,응답){
  db.collection('posttest').insertOne({username : 요청.body.username, gender : 요청.body.gender, e_id : 요청.body.e_id, e_address : 요청.body.e_address },function(에러, 결과){
    if(!에러){
      응답.send('전송되었습니다.');
      console.log(요청.body);
    }else{
      console.log(에러)
    }
  })
})

app.get('/',function(요청,응답){
  응답.sendFile(__dirname + '/index.html');
})

app.get('/signin',function(요청,응답){
  응답.sendFile(__dirname + '/signin.html');
})

app.get('/profile',function(요청,응답){

  db.collection('posttest').find().toArray(function(에러,결과){
    응답.render('profile.ejs',{profiles : 결과});  
  })

  
})
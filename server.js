const express = require('express');
const app = express();

const bodyParser = require('body-parser'); //서버요청을 쉽게 꺼내서 쓸 수 있는 라이브러리. 
app.use(bodyParser.urlencoded({extended : true})); // ↑사용하기. 


const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://qjin:Gorillaz-66@cluster0.xaphkkg.mongodb.net/?retryWrites=true&w=majority',function(에러, client){

  app.listen(8080, function(){
    console.log("listening on 8080")
  });

})






app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
}); 

app.get('/write',function(req,res){
  res.sendFile(__dirname + '/write.html');
});

app.post('/add', function(요청, 응답){
  // 응답.send('전송완료');
  console.log(요청.body)
  응답.sendFile(__dirname + '/write.html')
})
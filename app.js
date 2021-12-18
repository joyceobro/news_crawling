const express =require('express');
const helmet=require('helmet');
const app=express();
const ejs=require('ejs');
const db=require('./model/db')


app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/public', express.static(__dirname+'/public'));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded());


const mainRouter=require('./router/mainRouter');

app.use('/class101', mainRouter);

app.listen(3000, function(req, res){
    db.sequelize.sync({force:false})  //db의 전원버튼 force가 거짓이면 리셋이 아니라 업데이트를 해줌
    console.log("서버가 실행되고 있다!");
})
const express =require('express');
const router=express.Router();
const db=require('../model/db');

const cheerio=require("cheerio"); //크롤링
const axios=require("axios"); //외부에서 정보를 가져올 때
const iconv=require("iconv-lite"); //한글 깨질 때
const { request } = require('express');
const url_a ="https://search.naver.com/search.naver?&where=news&query="
const url_b ="%EC%9D%BC&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=23"

router.get("/excel/down", function(req,res){
    let excel_data=[{"A":1,"B":2, "C":3, "D":4}]
    res.xls('data.xlsx', excel_data);
})


router.get("/excel",function(req,res){
    res.render("excel")
})

router.get("/input",function(req,res){
    res.render('input')
})
router.post("/input_test", function(req,res){
    var input_val = req.body;
    console.log(input_val.start_day);
    res.send({success:200})
  
})
router.post("/crawling", function(req,res){
    var input_val = req.body;
    console.log(input_val.start_day);
    axios({url:url_a+String(input_val.start_day)+url_b, method:"GET", responseType:"arraybuffer"}).then(function(html){
        const content=iconv.decode(html.data, 'utf-8').toString() //한글깨짐 방지
        const $ =cheerio.load(content) 
        const table = $(".news_tit")  //리스트로 담음
       const result =[];
        table.each(function(i,element){
            const title = $(element).text();
            const link = $(element).attr('href');
            db.news_raw.create({
                news_title: title,
                news_link: link
            }).then(function(result){
                res.redirect('/view');
            })
        }) //리스트 안에서 반복문
    })
  
})

router.post("/db_input", function(req,res){
    console.log(req.body);
    var body =req.body;
    k=Object.keys(body).length;
for (var i=0; i<k;i++){
    db.select_news.create({
        select_title: Object.keys(body)[i],
        select_link: Object.values(body)[i]
    }).then(function(result){
        res.redirect('/view_select');
    })
    
    
}
})

router.get("/view", function(req,res){
     
    db.news_raw.findAll().then(function(result){
        res.send({success:200, data:result})
    })
})

router.get("/view_select", function(req,res){
     
    db.select_news.findAll().then(function(result){
        res.send({success:200, data:result})
    })
})



router.get("/", function(req, res){
   res.render('test', {title:"영화 리뷰 사이트"})
})

router.post("/review/create", function(req,res){
    let movie_id=req.body.movie_id;
    let review=req.body.review;
    if(movie_id==''||movie_id==0){             
        res.send({success:400})    
    } else{
        db.reviews.create({
            movie_id:movie_id,
            review: review
        }).then(function(result){
            res.send({success:200})
        })
    }
})

router.get("/review/read", function(req,res){
    let news_id=req.query.news_id;
    
    db.reviews.findAll({where:{idx:news_id}}).then(function(result){
        res.send({success:200, data:result})
    })
})

router.post("/postapi", function(req, res){
 
    let body=req.body;
    console.log(body);
     res.send('POST API');
 })

router.get("/data/create",function(req, res){
    let user_id=parseInt(Math.random()*10000)
    db.users.create({user_id:user_id}).then(function(result){
        res.send({success:200})
    })
})

router.get("/data/read",function(req, res){
    db.users.findAll().then(function(result){
        res.send({success:200, data:result})
    })
})

router.post("/data/update",function(req, res){
    let target_id=req.body.target_id;
    db.users.update({user_id:9999},{where:{user_id:target_id}}).then(function(result){
        res.send({success:200})
    })
})

router.post("/data/delete",function(req, res){
    let target_id=req.body.target_id;
    db.users.destroy({where:{user_id:target_id}}).then(function(result){
        res.send({success:200})
    })
})



module.exports=router
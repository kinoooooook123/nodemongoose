const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const { User } = require('./models/User')
// models 아래 있는 User.js 를 사용할 수 있게 해준다.

const bodyParser = require('body-parser')

//use 영역
app.use(bodyParser.urlencoded({ extended: true }));
//set 영역
app.set('views', './views');
app.set('view engine', 'pug');

//몽고디비 연결
mongoose.connect('mongodb+srv://jinwook:q0285qeoq259@cluster0-v3i7n.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, function(err){
    if(err){
        console.log(err);
        return
    }
    console.log('DB Connected!!');
});

//라우팅
app.get('/register', function(req, res){
    res.render('create');
})

app.post('/register_process', function(req, res){
    const user = new User({
        name: req.body.name1,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    })
    user.save(function(err,doc){
        if(err){
            console.log(err);
        }
        //목록을 다시 보여주기
        res.render('create')
    })   
})

app.get('/login', function(req, res){
    //로그인 페이지 기존에 있던 데이터와 DB 상의 데이ㅓ가 같은지 확인한다..!
    res.send('this is login page')
})

app.get('/list', function(req, res){
    var finded = User.find(function(err, result){
        if(err){
            console.log(err)
        }
        res.render('lists', {members : result})
    });
})

app.get('/find', function(req, res){
    res.render('find')
})

app.post('/find_process', function(req, res){
    User.findOne({name: req.body.name}, function(err,result){
        if(err){
            console.log(err);
        }
        res.render('finded', {finded_name : result.name, finded_password: result.password, finded_mail: result.email, finded_number:result.role})
    })
})

app.post('/update_process', function(req, res){
    User.update({name: req.body.name}, {$set: {password: req.body.password, email:req.body.email, role:req.body.number}}, function(err, result){
        if(err){
            console.log(err);
        }
        res.render('finded2', {finded_name : result.name, finded_password: result.password, finded_mail: result.email, finded_number:result.role})
    })
})


app.listen(port, function () {
    console.log(`Server Start at http://localhost:${port}`)
})
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();



//引入users.js
const users = require("./routes/api/users");
const profiles = require('./routes/api/profiles');


//使用body-parse中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//DB config(在线数据库的链接方式)
 //const db = require("./config/keys").mongoURI


// mongoose.connect(db).then(
//     () =>{
//         console.log("MongonDB Connected")
//     }
// ).catch(err => console.log(err));


//本地数据的链接方式
const db = require('./config/db');



// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);


//使用routes中间件
// app.use("/api/users",users);
// app.use("/api/profiles",profiles);
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;


app.listen(port,()=> {
    console.log(`Server running on port ${port} `)
})
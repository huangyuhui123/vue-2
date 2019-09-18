//login & register
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require('passport')



const User = require("../../models/User")

router.get("/test",(req,res) => {
    res.json({msg: "login works"})
})


// router.post("/register",(req,res)=>{
//     console.log(req.body)
//     //查询数据库中是否拥有邮箱
//     User.findOne({
//         email:req.body.email
//     }).then((user) =>{
//         if(user) {
//             return res.status(400).json("邮箱已被注册")
//         }else{
//             //生成全球公认头像
//             const avatar= gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
//             const newUser = new User({
//                 name: req.body.name,
//                 email: req.body.email,
//                // avatar,
//                 password: req.body.password,
//                 identity: req.body.identity
//             })
//             bcrypt.genSalt(10, function(err, salt) {
//                 bcrypt.hash(newUser.password, salt, function(err, hash) {
                  
//                     if (err) throw err;
//                     newUser.password = hash;
//                     newUser.save()
//                             .then(user =>res.json(user))
//                             .catch(err => console.log(err));
//                 });
//             });

//         }
//     })
// })

router.post('/register', (req, res) => {
    // 查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json('邮箱已被注册!');
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
  
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          identity: req.body.identity
        });
  
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
  
            newUser.password = hash;
  
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

router.post("/login",(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    //查询数据看
    User.findOne({email}).then(
        (user)=>{
          console.log("user",user)
            if(!user) {
                return res.status(404).json("用户不存在")
            }
            //密码匹配
            bcrypt.compare(password, user.password).then(
                isMatch =>{
                    if(isMatch) {
                       
                        //jwt.sign("规则","加密名字","过期时间","箭头函数")
                        const rule = {id: user.id,
                            name:user.name,
                            identity:user.identity,
                            //avatar:user.avatar
                        }
                        //过期时间为1个小时： 3600秒
                        jwt.sign(rule,keys.secretOrkey,{expiresIn:3600},((err,token)=>{
                            if(err) throw err;
                            res.json({
                                success:true,
                                token:"Bearer " + token
                            })
                        }))
                    }else{
                        return res.status(400).json("密码错误！")
                    }
                }
            )
        }
    )
    
})

router.get("/current", passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        email:req.user.email,
        name:req.user.name,
        identity:req.identity
    })
})

module.exports = router;
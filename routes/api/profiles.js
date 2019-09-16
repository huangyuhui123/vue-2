const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require("../../models/Profiles");


router.get("/test",(req,res)=>{
    res.json({msg:"profile works"})
})

//@route POST api/profiles/add
//@desc  创建接口信息
//@access Private
router.post("/add",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profilesFileds ={};
    if(req.body.type) profilesFileds.type= req.body.type;
    if(req.body.describe) profilesFileds.describe= req.body.describe;
    if(req.body.income) profilesFileds.income= req.body.income;
    if(req.body.expend) profilesFileds.expend= req.body.expend;
    if(req.body.cash) profilesFileds.cash= req.body.cash;
    if(req.body.remark) profilesFileds.remark= req.body.remark;
    
    new Profile(profilesFileds).save().then((profile)=>{
        res.json(profile)
    }).catch(err=>{

    })
})

//@route POST api/profiles/
//@desc  创建接口信息
//@access Private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.find().then(
        profile=>{
            if(!profile) {
                return res.status(404).json('没有任何内容')
            }
            res.json(profile)
        }
    ).catch(err=>res.status(404).json(err));
})

//@route POST api/profiles/:id
//@desc  查询一条信息
//@access Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id}).then(
        profile=>{
            if(!profile) {
                return res.status(404).json('没有任何内容')
            }
            res.json(profile)
        }
    ).catch(err=>res.status(404).json(err));
})

//@route POST api/profiles/edit
//@desc  编辑信息接口
//@access Private

router.post("/edit/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profilesFileds ={};
    if(req.body.type) profilesFileds.type= req.body.type;
    if(req.body.describe) profilesFileds.describe= req.body.describe;
    if(req.body.income) profilesFileds.income= req.body.income;
    if(req.body.expend) profilesFileds.expend= req.body.expend;
    if(req.body.cash) profilesFileds.cash= req.body.cash;
    if(req.body.remark) profilesFileds.remark= req.body.remark;
    
   Profile.findOneAndUpdate(
       {_id: req.params.id},
       {$set:profilesFileds},
       {new:true}
   ).then(profile=>res.json(profile))
})


//@route POST api/profiles/delete
//@desc  删除信息接口
//@access Private

router.delete("/delete/:id",passport.authenticate('jwt',{session:false}),(req,res)=>{
    
   Profile.findByIdAndRemove(
       {_id: req.params.id},
   ).then(profile=> {
       profile.save().then(
           profile=>res.json(profile)
       )
    }).catch(err=>res.status(404).json('删除失败！'))
})
module.exports = router;
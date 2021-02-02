const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const employee = mongoose.model('employee')
const multer = require('multer');
const path = require('path');
require('../server');

var storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname);
    }
});
 
var upload = multer({storage:storage});



router.get('/',(req,res)=>
{
    res.render('index',{
        username:'mo'
    });
});
router.get('/error',(req,res)=>
{
    res.render('error',{
        errorcomponent:"this is error"
    });
});

router.get('/addoredit',(req,res)=>
{
    res.render('addoredit');
});


router.post('/employee',upload.single('img'),(req,res)=>
{
    if(req.body._id == '')
        insertrecord(req,res);
        else
        updaterecord(req,res);
});

router.get("/employeelist",(req,res)=>
{
    employee.find((err,data)=>
    {
        if(!err)
            res.render('employeelist',{
                list:data
            });
        else
            console.log(`error ${err}`);
    });
});
function insertrecord(req,res)
{
    var emp = new employee();
    emp.name = req.body.name;
    emp.mobile = req.body.mobile;
    emp.city = req.body.city;
    emp.image = req.file.filename;
    emp.save((err,data)=>
    {
        if(!err)
          // console.log(emp);
            res.redirect('/employeelist');
        else
            console.log(`error ${err}`);
    });
}

function  updaterecord(req,res)
{
    //if req for file than go to this condition
    if(req.file)
    {
        employee.findByIdAndUpdate({_id:req.body._id},{
            name:req.body.name,
            mobile:req.body.mobile,
            city:req.body.city,
            image:req.file.filename,

        },(err,data)=>
        {
            if(!err){
                res.redirect('/employeelist');
                
            }
            else{
                console.log(`error ${err}`);
            }
        });
        

    }
    //if update only recornds go to this condtions
    else
   { 
        employee.findByIdAndUpdate({_id:req.body._id},req.body,{new : true},(err,data)=>
        {
            if(!err){
                res.redirect('/employeelist');
                
            }
            else{
                console.log(`error ${err}`);
            }
        })
    }
   
}

router.get("/:id",upload.single('img'),(req,res)=>
{
    employee.findById(req.params.id,(err,data)=>{
        if(!err)
        {
            res.render("addoredit",{
                emp:data
            });
        }
        else
            console.log(`error ${err}`);
    });
    
});

router.get('/delete/:id',(req,res)=>{
    employee.findByIdAndRemove(req.params.id,(err,data)=>{
        if(!err)
        {
            res.redirect('/employeelist')
        }
        else
            console.log(`error ${err}`);
    })
})

module.exports = router;
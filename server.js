require('./models/db')
const express = require('express');
var app = express();
const path = require('path');
const hbs = require('hbs');
const bodyparser = require('body-parser');
const multer = require('multer');
const employeecontroller = require('./controller/employeecontroller')
var PORT =3000;

const staticpath = path.join(__dirname,"./public");
const templatepath = path.join(__dirname,"./views/templates");
const partialpath = path.join(__dirname,"./views/partials");
app.use(express.static(staticpath));

//set view engline
app.set("views",templatepath);  //add lines when view not find
app.set("view engine","hbs");

//register
hbs.registerPartials(partialpath);

//body-parser
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

//multer
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }
});
 
var upload = multer({storage:storage});

app.listen(PORT,()=>
{
    console.log(`listem from port ${PORT} `)
});

//route that export by employeecontroller
app.use('/',employeecontroller);
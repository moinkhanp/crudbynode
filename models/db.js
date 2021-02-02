const mongoose = require('mongoose');
require('./employeemodel');


mongoose.connect("mongodb://localhost:27017/crudbynode",{ useNewUrlParser: true , useUnifiedTopology: true }).
then(()=> console.log("connected..."))
.catch((err)=>console.log(err));
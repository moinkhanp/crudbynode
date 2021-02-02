const mongoose = require('mongoose');

var employeeshema = new mongoose.Schema({
    name:
    {
        type:String,
        require:'this field mendetory'
    },
    mobile:{
        type:Number
        
    },

    city:{
        type:String
       
    },
    image:
    {
        type : String
    },
});

mongoose.model('employee',employeeshema);
var express= require('express');
var mongoose= require('mongoose');
var app= express();
var router=express.Router();
var schema= require('./../model/myschema.js');
var bodyparser= require('body-parser');
var mongo = require('mongodb');


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/employeeSchema');
mongoose.connection.on('connected',function(error,res){
    if(error)
    console.log("Error...");
    else
    console.log("Connected");
});

app.use(bodyparser.urlencoded({extended:false}));
router.get('/',function(req,res){

    schema.find({name:req.body.searchuser},function(err,result){
        if(err)
        console.log("Error occured in retrival");
        else
        {
            res.render('./../views/viewDataOfParticularUser.ejs',
                      {result:result}  
                      );
        }
        
    })
});

module.export=router;
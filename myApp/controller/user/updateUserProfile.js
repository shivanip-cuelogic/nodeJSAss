var express= require("express");
var app = express();
var bodyparser= require("body-parser");
var Schema= require('./../../model/myschema');
var mongoose= require('mongoose');
var router=express.Router();

//set up connection with employeeschema database

//mongoose connection
mongoose.connect("mongodb://localhost/employeeSchema");
mongoose.connection.on('connected',function(err,result){
    if(err)
    throw err;
    else
    console.log("DataBase connected fro updation");
});

app.use(bodyparser.urlencoded({extended:true}));
//route for updating user profile 
router.post('/',function(req,res){
    console.log("user data module");
    //    var data= new Schema({name:req.body.username,
    //                          password:req.body.password,
    //                          age:req.body.age,
    //                          city:req.body.city,
    //                          salary:req.body.salary,
    //                          project:req.body.project,
    //                          ObjectId:id
    //                         });
    
    //update data
    
    Schema.findByIdAndUpdate(req.body.id,{$set:{name:req.body.username,
                                 password:req.body.password,
                                 age:req.body.age,
                                 city:req.body.city,
                                 salary:req.body.salary,
                                 project:req.body.project,
                                 ObjectId:req.body.id}},{new:true},
        function(error,result){
        if(error)
        throw error;
        else
        {
            console.log("current user data updated successfully:",result);
            var hold=" Updated Profile";
            res.render('./../views/user/profile.ejs',
                                {
                                header:hold,
                                name:req.body.username,
                                password:req.body.password,
                                age:req.body.age, 
                                city:req.body.city,
                                project:req.body.project,
                                salary:req.body.salary,
                                ObjectId:req.body.id
                                });
        }
       // res.send("Current user:"+result);
    });

    });

   

    module.exports=router;
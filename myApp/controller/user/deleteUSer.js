var express= require("express");
var app= express();
var bodyparser= require("body-parser");
var Schema=require("./../../model/myschema");
var mongoose=require("mongoose");
var router =express.Router();



mongoose.connect("mongodb://localhost/employeeSchema");
mongoose.connection.on('connected',function(err,result){
    if(err)
    throw err;
    else
    console.log("DataBase connected for deletion");
});

// app.use(bodyparser.urlencoded({extended:true}));
router.post("/",function(req,res){
    console.log("enter..."+req.body.id);
    Schema.findById(req.body.id,function(err,result){

        if(err)
        {
            res.send("user not found");
        }
        else{
            result.remove({_id:req.body.id},function(err){
                if(err)
                throw err;
                else
                console.log("deleted successfully");
            });
            // result.remove()(err,deleteUser){
            //     if(err)
            //     throw err;
            //     else
            //     res.send("deleted successfully"+deleteUser);
            // })
            // res.send("user found:"+result);
            }
    
   console.log("Delete user Page-->"+result);
// res.send("hey..");
     });
  
   
});

module.exports=router;
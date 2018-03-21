//depencies
var useragent = require('useragent');
var myLogSchema= require('./../../model/logSchema');
var express= require("express");
var app= express();
var mongoose = require('mongoose');
var schema= mongoose.Schema;

mongoose.connect("http://localhost:/UsersActivity");
mongoose.connection.on('connected',function(err ,result){
                if(err)
                console.log("Error in connecting to database");
                else
                console.log("User got connected to database");
});


app.post('/',function(req,res){

console.log("log fileeeeeeeeeee");
     //to get full url of user signing in
    var fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    //response.send(fullUrl);

//      user agent
    var agent = useragent.parse(request.headers['user-agent']);
    agent.toString();
    //response.send('your useragent is ' + agent);  

    var datetime = new Date();
    //response.send(datetime); 

    var logData= new myLogSchema({
        urldetails:fullUrl,
        userAgent:agent,
        dateDetails:datetime
        //objectId: //
    });
    logData.save(function(err,result){
        if(err)
        console.log("Could not maintain log..Some Error occured");
        else{
            console.log("Log added as:"+result);
        }
    });

//also save object id
 } );

 module.exports=app;

  
  
        
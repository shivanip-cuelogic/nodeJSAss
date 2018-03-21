
//depencies
var express= require('express');
var app=express();
var port = 3000;
var path=require('path');
var Schema= require('./model/myschema');
var mongoose= require('mongoose');
var bodyparser= require('body-parser');
var passport= require('passport');
var fs = require('fs');


//static path to public directory
app.use(express.static(path.resolve(__dirname+'/views')));
app.use(bodyparser.urlencoded({extended:false}));

//authentication using tokennization
var api=require('./controller/api');
var route=require('./controller/user/handler');
var loadindexfile= require('./controller/login and register/pageloader');
var logsave=require('./controller/user/logdetails');
var userUpdate=require('./controller/user/updateUserProfile'); 
var deleteUser=require('./controller/user/deleteUSer');


//first load a html page
app.use('/testPage',loadindexfile);
//generate a token for valid user 
app.use('/test/submit',route);
//then save that info of user along with token in schema
app.use('/test/login',api);
//save user log
app.use('/test/saveData',logsave);
//update
app.use('/test/updateUserProfile',userUpdate);  

//delete user
app.use('/test/deleteUser',deleteUser);


//listen to the port
app.listen(port,function(){
    console.log("server started at port no:"+port);
});


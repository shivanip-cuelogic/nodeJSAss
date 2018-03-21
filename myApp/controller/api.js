var express= require('express');
var jwt= require('jsonwebtoken');
var mongoose= require('mongoose');
var app= express();
var router=express.Router();
var User= require('./../model/user.js');
var schema= require('./../model/myschema.js');
var bodyparser= require('body-parser');
var path=require('path');
var mongo = require('mongodb');
var useragent = require('useragent');
var myLogSchema= require('./../model/logSchema');
var ObjectId = require('mongodb').ObjectID;
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/employeeSchema');
mongoose.connection.on('connected',function(error,res){
    if(error)
    console.log("Error...");
    else
    console.log("Connected");
});

mongoose.connect("http://localhost:/UsersActivity");
mongoose.connection.on('connected',function(err ,result){
                if(err)
                console.log("Error in connecting to database");
                else
                console.log("User got connected to database user");
});

app.use(bodyparser.urlencoded({extended:false}));
// app.use(express.static(path.resolve(__dirname+ '/views')));

//controller of the code
router.post('/',function(req,res){
    //console.log("hello");
    var data= new User({name:req.body.username,
                        password:req.body.password});
    
  
        //console.log(data);
  schema.find({name: data.name,password:data.password}, function (err, existingUser){
        if(err)
        {
            res.send("some error occured");
        }
        else if(existingUser.length<1)
        {
        res.send("user not found....");     
       
        }
        else{
             // res.send("hello user");
             var message;
             if(data.name=="admin" && data.password=="admin")
             {
                // jwt.sign({user:data},'secretkey',function(err,token){
                //     // res.json({
                //     //             message:"hello admin..",
                //     //             data,
                //     //             token:token
                //     //         });
                   
                //     }); 
                    //res.sendFile(path.resolve(__dirname+"./../views/try2.html"));
                    // console.log(ObjectId(existingUser[0]._id) );
                    // console.log(existingUser[0]);
                    //var id= ObjectId(existingUser[0]._id );
                    // console.log("id of user---->"+id);
                   // render admin info...
                    // res.render('./../views/profile.ejs',
                    //             {
                    //             header:"My Profile",
                    //             name:existingUser[0].name,
                    //             password:existingUser[0].password,
                    //             age:existingUser[0].age, 
                    //             city:existingUser[0].city,
                    //             project:existingUser[0].project,
                    //             salary:existingUser[0].salary,
                    //             ObjectId:id
                    //             });

        //renser info of all user in database
        schema.find(function(err,result){
            if(err)
            console.log("Error occured in retrival");
            else
            {
                res.render('./../views/admin/adminLoginPage.ejs',
                            {
                                link:"/admin/viewUsers"
                            });
                // res.send("All users data:"+result);
            }


        });

                }
             else
             {
                // console.log(ObjectId(existingUser[0]._id) );
                // console.log(existingUser[0]);
                var id= ObjectId(existingUser[0]._id );
                // console.log("id of user---->"+id);
                        // jwt.sign({user:data},'secretkey',function(err,token){
                        // // res.json({
                        // //             message:"hello user..",
                        // //             data,
                        // //             token:token
                        // //         });
                        //         res.sendFile("./..views/try2.html");
                        // }); 
                        //res.sendFile(path.resolve(__dirname+"./../views/try2.html"));
                        res.render('./../views/user/profile.ejs',
                        { header:"My Profile",
                            name:existingUser[0].name,
                        password:existingUser[0].password,
                        age:existingUser[0].age, 
                        city:existingUser[0].city,
                        project:existingUser[0].project,
                        salary:existingUser[0].salary,
                        ObjectId:id
                     });

                     console.log("log fileeeee");
                     //to get full url of user signing in
                    var fullUrl =req.protocol + '://' +req.get('host') +req.originalUrl;
                    //response.send(fullUrl);
                
                //      user agent
                    var agent = useragent.parse(req.headers['user-agent']);
                    agent.toString();
                    //response.send('your useragent is ' + agent);  
                
                    var datetime = new Date();
                    //response.send(datetime); 
                
                    var logData= new myLogSchema({
                        urldetails:fullUrl,
                        userAgent:agent,
                        dateDetails:datetime,
                        objectId: id
                    });
                    logData.save(function(err,result){
                        if(err)
                        console.log("Could not maintain log..Some Error occured");
                        else{
                            console.log("Log added as:"+result);
                        }
                    });
             }
            //log maintain during login of each user
             
            }
    } );
    //this api is not getting call check it
    // var logsave=require('./logdetails');
    //          app.use('/savelog',logsave);

    // var userUpdate=require('./controller/updateUserProfile'); 
    // app.use('/updateUserProfile',userUpdate);        
    // document.getElementById("name").innerHTML = data;
    // document.getElementById("password").innerHTML = status;
    
});


module.exports= router;

//  Schema.employeeSchema.authenticate = function (uname, upassword, callback) {
//     schema.find({ name:uname  })
//       .exec(function (err, user) {
//         if (err) {
//           return callback(err)
//         } else if (!user) {
//           var err = new Error('User not found.');
//           err.status = 401;
//           return callback(err);
//         }
//         bcrypt.compare(password, user.password, function (err, result) {
//           if (result === true) {
//             return callback(null, user);
//           } else {
//             return callback();
//           }
//         })
//       });
//   }


    // jwt.sign({user:user},'secretkey',function(err,token){
    //     res.json({
    //         token:token
    //     });
        
    // });
// });

// app.listen(8000,function(req,res){
// console.log("server created at port 8000");

// });



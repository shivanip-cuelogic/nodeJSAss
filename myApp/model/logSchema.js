var mongoose = require('mongoose');
// var express = require("express");
var Schema= mongoose.Schema;

var myLogSchema= new Schema({
     urldetails:String,
     userAgent:String,
     dateDetails:String,
     objectId:{type:mongoose.Schema.Types.ObjectId,ref:'Schema',required:true},
});

module.exports=mongoose.model('myLogSchema',myLogSchema);
'use strict';


    /*var bots=[
            {   "first_name":"SACHIN",   "last_name":"WARE",   "email":"sachinware813@gmail.com,  "username":"sachin.ware","password":"sachin111"  },
            {   "id":2,  "name":'KOMAL',  "age":25,   "location":"CHINCHWAD" },
            {   "id":3,  "name":'KIRAN',  "age":23,"location":"KARAD"  },
            {    "id":4,   "name":'AKASH',"age":21, "location":"PCMC" }
        ]*/

var pg=require('pg');
var db=require('./database');

exports.botlist = function(req, res){
	var botsStr;
    var bots={};
    var jsonObjArray;
    res.writeHead(200, {
        'Content-Type': 'JSON',
        'Access-Control-Allow-Origin' : '*'   //RFTL:Showing access control error when we hit this url from web browser on computer.this line doesnt affect mobile app.
    });
    console.log(db.botsTable);
     db.botsTable.forge().fetchAll().then(function(collection) //This is asynchronous function delays for some miliseconds to fetch data from database. So need to manage callback.
     {
    	 botsStr=JSON.stringify(collection);
       /*  console.log('bots:');
         jsonObjArray=JSON.parse(botsStr);
         console.log(jsonObjArray);*/

    	  sendResponse();
     });

    function sendResponse()
    {
        res.end(botsStr);
    }
};


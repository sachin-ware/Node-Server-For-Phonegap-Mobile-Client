'use strict';

var db=require('./database');
var sendgrid_uname,sendgrid_pwd,from_email;
var generator = require('random-password-generator');

function generateRandomPassword() {
    //return
    console.log("random password:"+generator.generate());
}


function getSendgridCredintials(callback)//This function is only done to hide sendgrid credintials in code.
{
    db.sendgridTable.forge().fetchAll().then(function (collection) //This is asynchronous function delays for some miliseconds to fetch data from database. So need to manage callback.
    {
        if (collection) {
            var records = JSON.stringify(collection);//dumping collection to JSON String.
            var jsonObjArray = JSON.parse(records);//creating array from json string.
            //console.log(jsonObjArray);
            sendgrid_uname=jsonObjArray[0].user_id;
            sendgrid_pwd=jsonObjArray[0].pwd;
            from_email=jsonObjArray[0].mailer_email;
           // console.log(sendgrid_uname+   '   '+ sendgrid_pwd);
            callback();
        }
        else {
            console.log('Failed to send Registration mail. No Sendgrid username or pwd found in database.')
        }
    });

}


var SendGrid = require('sendgrid-nodejs').SendGrid;

exports.sendGridMailSend=function(user) {
    generateRandomPassword();
    getSendgridCredintials(function(){
        var sendgrid = new SendGrid(sendgrid_uname,sendgrid_pwd);
        sendgrid.send({
            to: user.email,
            from: from_email,
            subject: 'Registration Successfull with SRW.',
            text: "Hi "+user.first_name+",\n\n Welcome to SRW Ltd. You have been registered with us ."
        },function(obj){
            console.log(JSON.stringify(obj));
            console.log('Registration mail sent successfully');
        });
    });
}


exports.sendPasswordMail=function(user,callback) {
       // console.log('EMAIL:'+user.email);
        getSendgridCredintials(function(){
            var sendgrid = new SendGrid(sendgrid_uname,sendgrid_pwd);
            sendgrid.send(
            {
                to: user.email,
                from: from_email,
                subject: 'SRW Password Reset.',
                text: "Hi "+user.first_name+",\n\n Here is your user name and password: \n User name:"+user.user_name+" \n Password:"+user.pwd, //This works if receiver did not enabeled html contne.
                html:"<h3>Hi "+user.first_name+",</h3>\n\n <strong>Here is your user name and password: <br> User name:<strong style='color:red;'>"+user.user_name+" <br></strong> Password:<strong style='color:red;'>"+user.pwd+"</strong></strong>"
            },
            function(result){
               // console.log('send mail result in sendPasswordMail :'+result);
                //return result;
                callback(result);
            });
        });
}

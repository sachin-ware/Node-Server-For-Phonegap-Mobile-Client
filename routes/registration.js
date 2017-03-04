'use strict';
var pg=require('pg');
var db=require('./database');
var mailer=require('./srw_mailer')

/*{   "first_name":"SACHIN",
    "last_name":"WARE",
    "email":"sware@nisum.com",
    "username":"sachin.ware",
    "password":"pass123"
}*/

exports.registerUser = function(req, res) {
    var user = req.body;

   /* res.writeHead(200, {
        'Content-Type': 'JSON',
        'Access-Control-Allow-Origin' : '*'   //RFTL:Showing access control error when we hit this url from web browser on computer.this line doesnt affect mobile app.
    });*/

    db.userInfoTable.query(function(qb) {
        qb.where('email', '=', user.email);
    }).fetch().then(function(fetchedUser) {
            if(fetchedUser == null)
            {
                db.userInfoTable.forge({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email:user.email,
                    user_name:user.username,
                    pwd:user.password,
                }).save(null,{method:'insert'}).then(function(savedUser){
                        console.log('New user registered successfully:'+JSON.stringify(savedUser));
                        mailer.sendGridMailSend(user);
                       // mailer.sendPasswordMail(user,function(res){console.log('send pwd mail :'+res);});
                        res.status(200).send('User registered successfully.');
                    },
                    function(err) {
                        console.log(err);
                        res.status(500).send();
                    }
                );
            }
            else{
                console.log('user already exist with this email id:'+user.email);
                res.status(409).send("User with this email id already exist");
            }
        },
        function(err) {
            console.log(err);
            res.status(500).send();
        });



};

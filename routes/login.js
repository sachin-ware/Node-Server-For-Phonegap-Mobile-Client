'use strict';

var db=require('./database');
var mailer=require('./srw_mailer');

exports.logIn=function(req,res){
	var user=req.body;
	db.userInfoTable.query(function(qb) {
	qb.where('user_name', '=',user.username).andWhere('pwd', '=',user.password);
	}).fetch().then(function(User) { 
		if(User==null){
			res.status(401).send('Incorrect user name or password.');
		}
		else{
				res.send("User logged in  successfully.");
		}
	});
}

exports.forgotPassword=function(req,res){
	//console.log('in forgotPassword(): '+JSON.stringify(req.body));
	var user=req.body;
	db.userInfoTable.query(function(qb){
		qb.where('email', '=',user.email);
	}).fetch().then(function(User) {
		if(User!=null){
			//console.log('user found:'+JSON.stringify(User));
			var mailresult=mailer.sendPasswordMail(JSON.parse(JSON.stringify(User)),function(result){
				//console.log('mailresult: '+result);
				if(result==true){
					console.log("Password reset mail sent successfully to '"+user.email+"'");
					res.status(200).send("Password reset mail has been sent to '"+user.email+"'");
				}else{
					res.status(500).send("Something went wrong. Failed to send mail.");
				}
			});

		}
		else{
			res.status(404).send('User with this e-mail does not exist.');
		}
	});

}
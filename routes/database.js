'use strict';

// DATABASE CONNECTION
var knexDbConfig = require('knex')({
	client: 'pg',
	connection: {
		host     : '127.0.0.1',
		user     : 'postgres',
		password : 'root',
		database : 'SRW_DB',
		charset  : 'utf8'    	
	}
});


var bookshelf = require('bookshelf')(knexDbConfig);

exports.botsTable = bookshelf.Model.extend({
	tableName: 'bots'
});

exports.userInfoTable = bookshelf.Model.extend({
	tableName: 'user_info'
});
exports.sendgridTable = bookshelf.Model.extend({
	tableName: 'SendGrid'
});
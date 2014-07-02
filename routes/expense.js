/*
 * GET home page.
 */

var mysql = require('mysql'),
	util = require('util');


var DB = {
	connect: function() {
		return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'yokoono',
			database : 'my_expenses'
		});
	},
	
	disconnect: function() {
		mysql.end();
	}
};


/*var db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'yokoono',
	database : 'my_expenses'
});*/

exports.add = function(req, res) {
	// res.render('index', { title: 'Express' });
	var reqData = req.body;
	var resData = {
			status: 1
	};
	var db = DB.connect();
	console.log(db.escape(new Date(reqData.time)));
	//INSERT INTO `expense`(`id`, `timestamp`, `tag`, `amount`) VALUES
	//db.escape(new Date(reqData.time))
	var timeObj = new Date(reqData.time);
	console.log(timeObj.getDay());
	var time = timeObj.getFullYear() + '-' + timeObj.getMonth() + '-' +timeObj.getUTCDate();
	console.log(time.toString());
	
	db.query('INSERT INTO `expense`(`tag`, `amount`, `time`) VALUES ("'
			+ reqData.tag + '", ' + reqData.amount + ',' + db.escape(new Date(reqData.time)) + ')',
			function(err, results) {
				if (results) {
					res.send(resData);
				} else if (err) {
					res.send(err);
				}
			});

	
	db.end();
};

exports.getAll = function(req, res) {
	var db = DB.connect();
	db.query('SELECT * FROM `expense` WHERE 1', function(err, rows) {
		if (rows) {
			res.send({result: rows});
		} else if (err) {
			res.send(err);
		}
		
	});
	db.end();
};

exports.DELETE = function(req, res) {
	var reqData = req.body;
	res.send({params: req.params});
	console.log(req.params);
};

exports.update = function(req, res) {
	
};
/*
 * GET home page.
 */

var mysql = require('mysql'),
    util = require('util');


var DB = {
    connect: function () {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'yokoono',
            database: 'my_expenses'
        });
    },

    disconnect: function () {
        mysql.end();
    }
};


exports.add = function (req, res) {
    var reqData = req.body;
    var resData = {
        status: 1
    };
    var db = DB.connect();
    var timeObj = new Date(reqData.time);
    var time = timeObj.getFullYear() + '-' + timeObj.getMonth() + '-' + timeObj.getUTCDate();

    db.query('INSERT INTO `expense`(`tag`, `amount`, `time`) VALUES ("'
        + reqData.tag + '", ' + reqData.amount + ',' + db.escape(new Date(reqData.time)) + ')',
        function (err, results) {
            if (results) {
                resData.data = results;
                res.send(resData);
            } else if (err) {
                res.send(err);
            }
        });


    db.end();
};

exports.getAll = function (req, res) {
    var db = DB.connect();
    db.query('SELECT * FROM `expense` WHERE 1', function (err, rows) {
        if (rows) {
            res.send({result: rows});
        } else if (err) {
            res.send(err);
        }

    });
    db.end();
};

exports.delete = function (req, res) {
    var id = null;
    if (req && req.params && req.params.id) {
        id = req.params.id;
        var db = DB.connect();
        db.query('DELETE FROM `expense` WHERE ?', {id: id}, function(err, result) {
            console.log(result);
        });
    }
    res.send({id: id});
};

exports.update = function (req, res) {

};

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , expense = require('./routes/expense')
  , http = require('http')
  , util = require('util')  
  , childProcess = require('child_process')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/expenses', expense.getAll);
app.post('/add-expense', expense.add);
//app.delete('/expense', expense.delete);
app['delete']('/expense/:id', expense.DELETE);

var ipAddress = "10.0.0.7:";
childProcess.exec('hostname -I', function(error, stdout, stderr) {
	ipAddress = stdout.split(" ")[0] + ":";
});

/*function doSomethingAsync() {
	  var deferred = q.defer();
	  setTimeout(function() {
	    deferred.resolve('hello world');
	  }, 500);

	  return deferred.promise;
	}

doSomethingAsync().then(function(val) {
  console.log('Promise Resolved!', val);
});*/


if (!process.argv[2]) {
	var spawn = childProcess.spawn,
	url = 'http://' + ipAddress + app.get('port') + '/app',
	args = ['--temp-profile', '--app=' + url, '--start-maximized'],
	chrome = spawn('chromium-browser', args);
	chrome.on('exit', function(e) {
		process.exit();
	});


	console.log('Spawned child pid (chromium-browser): ' + chrome.pid);
	chrome.stdin.end();
}

function listenCallback() {
	console.log('Express server listening on port ' + app.get('port'));
	
/*    exec("chromium-browser --kiosk http://example.com", function(error, stdout, stderr) {
        console.log("stdout: " + stdout);
        console.log("stderr: " + stderr);
        if (error !== null) {
            console.log("exec errror: " + error);
        }
    });*/
}

http.createServer(app).listen(app.get('port'), listenCallback);


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
app.get('/expense', expense.getAll);
app.put('/expense/:id', expense.update);
app.post('/expense', expense.add);
app.delete('/expense/:id', expense.delete);

// set current ip address
var ipAddress = "10.0.0.7:";
childProcess.exec('hostname -I', function(error, stdout, stderr) {
	ipAddress = stdout.split(" ")[0] + ":";
});

// set chrome child process
// maybe you need to change it to fit your system
if (!process.argv[2]) {
	var spawn = childProcess.spawn,
	url = 'http://localhost:' + app.get('port') + '/app',
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
}

http.createServer(app).listen(app.get('port'), listenCallback);

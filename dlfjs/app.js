var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var api = require('./routes/api');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api',api);
app.all('/api/add', function (req, res, next) {
	console.log('Add API is called...');
	api = new rest_api();
	result = api.write(req);
	if (result) {
		res.json({success: true})
	}
})
// app.all('/api/list', function (req, res, next) {
// 	console.log('List API is called...');
// 	api = new rest_api();
// 	var result = api.list(req);
// 	console.log("result:" + result)
// 	if (result) {
// 		res.json({success: true, item: result})
// 	}
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('abcd');
// // var db = new sqlite3.Database(':memory:');
// db.serialize(function() {
// 	db.run("CREATE TABLE user (id INT, dt TEXT)");
//
// 	var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
// 	for (var i = 0; i < 10; i++) {
//
// 	var d = new Date();
// 	var n = d.toLocaleTimeString();
// 	stmt.run(i, n);
// 	}
// 	stmt.finalize();
//
// 	db.each("SELECT id, dt FROM user", function(err, row) {
// 			console.log("User id : "+row.id, row.dt);
// 	});
// });
// db.close();
//


// const {app, BrowserWindow} = require('electron')
// const path = require('path')
// const url = require('url')
//
// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let win
//
// function createWindow () {
//   // Create the browser window.
//   win = new BrowserWindow({width: 800, height: 600})
//
//   // and load the index.html of the app.
//   win.loadURL(url.format({
//     pathname: 'localhost:3000',
//     protocol: 'file:',
//     slashes: true
//   }))
//
//   // Open the DevTools.
//   win.webContents.openDevTools()
//
//   // Emitted when the window is closed.
//   win.on('closed', () => {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     win = null
//   })
// }
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow)
//
// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
//
// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (win === null) {
//     createWindow()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
module.exports = app;

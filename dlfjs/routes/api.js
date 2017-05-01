// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
//
// class rest_api{
// 	constructor(){
// 		db.serialize(function() {
//
// 		db.run("CREATE TABLE lorem (id INTEGER PRIMARY KEY AUTOINCREMENT, created TIMESTAMP DEFAULT (DATETIME('now')), content TEXT)", function(error) {
// 			if (error != null) {
// 				if (error.message.indexOf("already exists") != -1) {
// 					console.log(error);
// 				}
// 			}
// 		})
// 		// var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
//
// 		// for (var i = 0; i < 10; i++) {
// 		// 	stmt.run('Ipsum ' + i);
// 		// }
//
// 		// stmt.finalize();
//
// 		db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
// 			console.log(row.id + ': ' + row.info);
// 		});
// 	});
// 	}
// 	write(req) {
// 		db.serialize(function () {
// 			var stmt = db.prepare('INSERT INTO lorem (content) VALUES (?)')
// 			stmt.run(req.body.content)
// 			stmt.finalize()
// 		})
// 		return true
// 	}
// 	list(req) {
// 		return db.serialize(function () {
// 			var items = [];
// 			db.each('SELECT id, created, content FROM lorem', function (err, row) {
// 				items.push({id: row.id, created: row.created, content: row.content})
// 				console.log(row.id + ': ' + row.created + ': ' + row.content)
// 				})
// 			console.log(items)
// 			return items
// 		})
// 	}
// }
// module.exports = rest_api;

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('abcd');
	// var db = new sqlite3.Database(':memory:');
	db.serialize(function() {
		db.run("CREATE TABLE user (id INT, dt TEXT)");

		var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
		for (var i = 0; i < 10; i++) {

		var d = new Date();
		var n = d.toLocaleTimeString();
		stmt.run(i, n);
		}
		stmt.finalize();

		db.each("SELECT id, dt FROM user", function(err, row) {
				console.log("User id : "+row.id, row.dt);
		});
	});
	db.close();

  res.render('index', { title: 'Express' });
});

module.exports = router;

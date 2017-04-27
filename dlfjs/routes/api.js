var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

class rest_api{
	constructor(){
		db.serialize(function() {

		db.run("CREATE TABLE lorem (id INTEGER PRIMARY KEY AUTOINCREMENT, created TIMESTAMP DEFAULT (DATETIME('now')), content TEXT)", function(error) {
			if (error != null) {
				if (error.message.indexOf("already exists") != -1) {
					console.log(error);
				}	
			}
		})
		// var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

		// for (var i = 0; i < 10; i++) {
		// 	stmt.run('Ipsum ' + i);
		// }

		// stmt.finalize();

		db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
			console.log(row.id + ': ' + row.info);
		});
	});	
	}
	write(req) {
		db.serialize(function () {
			var stmt = db.prepare('INSERT INTO lorem (content) VALUES (?)')
			stmt.run(req.body.content)
			stmt.finalize()
		})
		return true
	}	
	list(req) {
		return db.serialize(function () {
			var items = [];
			db.each('SELECT id, created, content FROM lorem', function (err, row) {
				items.push({id: row.id, created: row.created, content: row.content})
				console.log(row.id + ': ' + row.created + ': ' + row.content)
				})
			console.log(items)
			return items
		})
	}	
}
module.exports = rest_api;


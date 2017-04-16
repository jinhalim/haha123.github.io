var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

class rest_api{
	run(){
		db.serialize(function() {

			db.run('CREATE TABLE lorem (id INTEGER PRIMARY KEY AUTOINCREMENT, created TIMESTAMP DEFAULT (DATETIME('now')),info TEXT)');
			var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

			stmt.run(req.body.content)	

		    stmt.finalize();

		    db.each('SELECT rowid AS id, date, info FROM lorem', function(err, row) {
		      console.log(row.id + ': '+ row.date + row.info);
		    });
		  });

		return true
	}
	
}


module.exports = rest_api;
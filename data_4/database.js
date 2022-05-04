var sqlite3 = require('sqlite3').verbose()

// initialize a variable with the name of the database file
const DBSOURCE = "lab4.db"

// commect to the database
let db = new sqlite3.Database(DBSOURCE, (err) => {

    if(err) {
        console.error(err.message)
        throw err //throws error if it cannot connect to database


    } else {
        console.log('Connected to database.')
    }
});

// export the database so it can be used by other files
module.exports = db

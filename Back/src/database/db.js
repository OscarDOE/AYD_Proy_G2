const mysql = require('mysql2')

//Dev
const mysqlConnection = mysql.createConnection({
    host: '34.207.166.73',
    port: '3306',
    user: 'root',
    database: 'semi1_proyecto1'
})



mysqlConnection.connect(function(err) {
    if(err) return console.error('mysqlConnection - ', err)
    console.log('Database AWS is connected')
})

module.exports = mysqlConnection
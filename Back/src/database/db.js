const mysql = require('mysql2')

//Dev
const mysqlConnection = mysql.createConnection({
    host: 'database-sopes2.cnxc83q1b3zd.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'analisis_admin',
    database: 'ayd_proyecto1'
})

mysqlConnection.connect(function(err) {
    if(err) return console.error('mysqlConnection - ', err)
    console.log('Database AWS is connected')
})

module.exports = mysqlConnection
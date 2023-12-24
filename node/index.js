const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'rootpasswd',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTableSql = `CREATE TABLE IF NOT EXISTS people( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

const sql = `INSERT INTO people(name) values('Junior Lenzi')`
connection.query(createTableSql)
connection.query(sql)
connection.end()


app.get('/', (req, res) => {
    const getUserSql = `SELECT * FROM people`
    const connection = mysql.createConnection(config)
    const user = connection.query(getUserSql, (err, rows) => {
        const [user] = rows

        res.send(`<h1>Full Cycle Rocks!</h1> <br /> <br /> <h2>User: ${user.name}</h2>`)
    })
    
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
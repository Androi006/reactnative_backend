const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors') 
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const connection = mysql.createConnection({
    host: '159.89.206.43', //'localhost'
    user: 'jack', //'root'
    password: '123456', //''
    database: 'wannabedev', //'react_native1'
  })

connection.connect()

app.get('/', (req, res) => {
    res.send('Hello World react')
})

app.get('/getData', (req, res) => {
    connection.query('SELECT * FROM user', (err, result) => {
        if (err) throw err
        
        res.send(result)
    })
})

app.post('/login', (req, res) => {
    res.send(req.body)
})

app.post('/loginUser', (req, res) => {
    const {email, pass} = req.body
    const query = "SELECT id FROM user WHERE email = ? AND password = ?"
    const params = [email, pass]
    connection.query(query, params, (err, result) => {
        if (err) throw err
        console.log(result)
        if(result.length > 0){
            res.send('Login Success')
        }else{
            res.send('Login Fail')
        }
    })
})

app.post('/register', (req, res) => {
    const {email, pass} = req.body
    const query = "INSERT INTO user (email, password) VALUES (?, ?)"
    const params = [email, pass]
    connection.query(query, params, (err, result) => {
        if (err) throw err
        
        res.send('Register Success')
    })
})

app.put('/updateUser', (req, res) => {
    res.send('update sucess')
})

app.put('/updateUser1', (req, res) => {
    const {email, pass, id} = req.body
    const query = "UPDATE user SET email = ?, password = ? WHERE id = ?"
    const params = [email, pass, id]
    connection.query(query,params, (err, result) => {
        if (err) throw err
        
        res.send('Update Success')
    })
})

app.delete('/deleteUser', (req, res) => {
    res.send('delete sucess')
})

app.delete('/deleteUser1', (req, res) => {
    const {id} = req.body
    const query = "DELETE FROM user WHERE id = ?"
    const params = [id]
    connection.query(query,params, (err, result) => {
        if (err) throw err
        
        res.send('delete Success')
    })
})

app.listen(port)
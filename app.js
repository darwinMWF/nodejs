const express = require('express');
const mysql = require("mysql");
const bodyparser = require("body-parser");
const command = require('nodemon/lib/config/command');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aTy@9898',
    database: 'blogsite',
    multipleStatements: true
    });


const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/blogs',(req,res)=>{
    mysqlConnection.query('SELECT * FROM blogs', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
})

app.post('/blog-post',(req,res)=>{
    // console.log(req.body)
    const {id,title,blogdata,blogdate} = req.body;
    const sql = "INSERT INTO `blogs` (id,title,blogdata,blogdate) VALUES (?,?,?,?)";
    mysqlConnection.query(sql,[id,title,blogdata,blogdate],function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        })
    res.json(req.body)

});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

app.listen(3000,()=>{
    console.log("server is on ");
})
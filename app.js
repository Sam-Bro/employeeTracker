// requirements
const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');

const app = express();

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    //database: 'employee_db'
})

//connectDB
db.connect( (err) => {
    if(err) {
        throw err;
    }
    console.log("Mysql connected");
})

//listen to port 

app.listen('3000', () => {
    console.log('server listening on port 3000');
})
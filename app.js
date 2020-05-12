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

//get user input 
function employeeApp() {
    function userSelect(){
        inquirer.prompt([
            {
            type: "list",
            name: "optionSelect",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view by department",
                "view by manager",
                "add employee",
                "remove employee",
                "Update Employee role" ,
                "Update Employee manager"
            ]
            }
        ]).then(userChoice => {
            switch(userChoice.optionSelect) {
                case "view all employees":
                    console.log("case 1");
                break;
                case "view by department":
                    console.log("case 2");
                break;
                case "view by manager":
                    console.log("case 3");
                break;
                case "add employee":
                    console.log("case 4");
                break;
                case "remove employee":
                    console.log("case 5");
                break;
                case "Update Employee role":
                    console.log("case 6");
                break;
                case "Update Employee manager":
                    console.log("case 7");
                break;
                
            }
        })
    }
    userSelect();
}

employeeApp();
    

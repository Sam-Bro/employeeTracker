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
    database: 'employee_db'
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
                    showAll();
                break;
                case "view by department":
                    console.log("case 2");
                break;
                case "view by manager":
                    console.log("case 3");
                break;
                case "add employee":
                    addEmployee();
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

    function addEmployee() {
        console.log("Adding new Employee")
        inquirer.prompt([
            {
                type: "input",
                name: "employeeName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "employeeLastName",
                message: "What is the employee's last name?"
            },
            {
                type: "input",
                name: "employeeTitle",
                message: "What is the employee's title?"
            },
            {
                type: "input",
                name: "employeeDepartment",
                message: "What is the employee's department?"
            },
            {
                type: "input",
                name: "employeeSalary",
                message: "What is the employee's salary?"
            },
            {
                type: "input",
                name: "employeeManager",
                message: "Who is the employee's manager?"
            }
        ]).then(answers => {
            let employees = {name: answers.employeeName, lastname: answers.employeeLastName, title: answers.employeeTitle, 
                department: answers.employeeDepartment, salary: answers.employeeSalary, manager: answers.employeeManager}
            let sql = 'INSERT INTO employees SET ?';
            let query = db.query(sql, employees, (err, result) => {
                if(err) throw err;
                console.log(result);
            })
        }) 
    }

// view all employees
    function showAll() {    
        let sql = "SELECT * FROM employees";
        let query = db.query(sql, (err, res) => {
            if (err) throw err;
            console.log("Name  ||  Last Name  ||  Title  ||  Department  ||  Salary  ||  Manager")
            console.log("=======================================================================")
            for (var i =0; res.length > i; i++) {
                console.log(res[i].name +  "    " + res[i].lastName + "    " + res[i].title + "    " + res[i].department + "    " + res[i].salary + "    " + res[i].manager )
            }
        })
    }




    userSelect();
}

employeeApp();
    

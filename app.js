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
                    showDepartment()
                break;
                case "view by manager":
                    showmanager();
                break;
                case "add employee":
                    addEmployee();
                break;
                case "remove employee":
                    removeEmployee();
                break;
                case "Update Employee role":
                    updateRole();
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


// view all employees by department
    function showDepartment() {
        inquirer.prompt([
            {
                name: "chooseDepartment",
                type: "input",
                message: "Which department would you like to view?",
            }
        ]).then(function(answer) {
            db.query("SELECT * FROM employees WHERE ?", { department: answer.chooseDepartment}, function(err, res) {
                if (err) throw err;
                console.log("Name  ||  Last Name  ||  Title  ||  Department  ||  Salary  ||  Manager")
                console.log("=======================================================================")
                for (var i =0; res.length > i; i++) {
                    console.log(res[i].name +  "    " + res[i].lastName + "    " + res[i].title + "    " + res[i].department + "    " + res[i].salary + "    " + res[i].manager )
                }
            })
        })
    }


//view all employees by manager
function showmanager() {
    inquirer.prompt([
        {
            name: "choosemanager",
            type: "input",
            message: "Which manager would you like to view?",
        }
    ]).then(function(answer) {
        db.query("SELECT * FROM employees WHERE ?", { manager: answer.choosemanager}, function(err, res) {
            if (err) throw err;
            console.log("Name  ||  Last Name  ||  Title  ||  Department  ||  Salary  ||  Manager")
            console.log("=======================================================================")
            for (var i =0; res.length > i; i++) {
                console.log(res[i].name +  "    " + res[i].lastName + "    " + res[i].title + "    " + res[i].department + "    " + res[i].salary + "    " + res[i].manager )
            }
        })
    })
}




//remove employee
function removeEmployee() {
    showAll();
    inquirer.prompt([
        {
            name: "removeEmployee",
            type: "input",
            message: "Which employee would you like to remove?",
        }
    ]).then(function(answer) {
        db.query("DELETE FROM employees WHERE ?", {name: answer.removeEmployee}, (err, result) => {
            if(err) throw err;
            console.log(result);
            showAll();
        })
        })
    }


// Update employee role
     function updateRole() {
        inquirer.prompt([
            {
                name: "getEmpName",
                type: "input",
                message: "Which employee's role would you like to update?",
            },
            {
                name: "getUpdRole",
                type: "input",
                message: "What is the updated role?",
            }
        ]).then(answers => {
            //console.log(answers.getUpdRole + answers.getEmpName);
            db.query(`UPDATE employees SET title = '${answers.getUpdRole}' WHERE name = '${answers.getEmpName}'`, (err, res) => {
                if (err) throw err;
                showAll();
            })
        })

     }

    // let sql = "SELECT department FROM employees";
    // let query = db.query(sql, (err, res) => {
    //     var departments = [];
    //     if (err) throw err;
    //     for(i = 0; res.length > i; i++) {
    //         console.log(res[i].department);
    //         departments += " " + res[i].department;
    //         console.log("department: " + departments)
    //     }
    //     function askDepartments(departments) {
    //         inquirer.prompt([
    //             {
    //                 name: "chooseDepartment",
    //                 type: "list",
    //                 message: "Select a department",
    //                 choices: [
                        
    //                 ]
    //             }
    //         ])
    //     }
    //     askDepartments();
    // })



    userSelect();
}

employeeApp();
    

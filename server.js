var mysql = require("mysql");
const app = express();
var inquirer = require("inquirer");
const mysql =require('mysql12');

 connect = mysql.createConnection({
    host: "localhost",port: 3001,

    user: "root",
    password: "root",
    database: "company_DB"
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});



//returns all employees 
function viewemployees() {
    const sql =
        "SELECT employee.id AS employee_id, concat(first_name, ' ', last_name) AS Employee, role.title AS roles, roles.salary AS salary, department_name AS Department, concat(manager.first_name, ' ', manager.last_name, '')" +
        "LEFT JOIN manager AS manager_id ON employee.manager_id= manager.first_name",
        "LEFT JOIN role ON employee.job_title=role.id " ,
        "LEFT JOIN department ON employee.department_id =role.department_id ";

    connect.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//returns all roles 
function viewroles() {
    const sql =
        "SELECT * FROM roles";
    connect.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//returns all departments 
function viewdepartments() {
    const sql =
        "SELECT * FROM department";
    connect.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//// run functions start
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Where would you like to go?",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View the departments",
                "View all roles",
                "View all employees",
                "Update an employee's role"
            ]
        })

        .then(function(answer) {
            switch (answer.action) {
            case "Add a department":
                add.department();
                break;

            case "Add a role":
                addroles();
                break;
                
            case "Add an employee":
                addemployee();
                break;
                
            case "View the departments":
                viewdepartments();
                break;
                
            case "View all roles":
                viewroles();
                break;
                
            case "View all employees":
                viewemployees();
                break;
                
            case "Update a employee's role":
                updateemployee();
                break;  
   
            case "Delete a employee":
                deleteemployee();
                break;
            }
        });
}

//// add functions response

function addemployee() {
    inquirer
      .prompt([{
          name: "first",
          type: "input",
          message: "What is the first name of this employee?"
      },
        {
          name: "last",
          type: "input",
          message: "What is this employees last name?"
        },
         {
            name: "role",
            type: "input",
            message: "What role does this employee have?"
        }
    
        .then(answers => {

            connect.query("INSERT INTO employee SET (?) ",
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    manager_id: answers.manager_id,
                    role_id: answers.job_title
                }, (err, res) => {
                    if (err) throw err;
                    start();
                });
        })
,

    function updateemployee(){
        inquirer
        .prompt([{
            name: "employeeFirstName",
            type: "input",
            message: "What is the first name of the employee you want to update?"
        }, 
        {
            name: "employeeLastName",
            type: "input",
            message: "What is the last name of the employee you want to update?"
        },
        {
            name: "role",
            type: "input",
            message: "What new role does this employee have?"
        }]) 
        .then(function(answer) {

            getroleID(answer.roles).then(function (roleID){
                console.log(roleID);
            
    
            connect.query("UPDATE employee SET ? WHERE ? AND ?",
            [{roles_id: roles.id}, 
                {first_name: answer.employeeFirstName},
                {last_name: answer.employeeLast}],
                 function(err, res) {
                if (err) throw err;
               
            });
    
            console.log("This employees role has been updated!");
            runSearch();
    
            });
        
            
        });
    },
    function deleteemployee() {
        connect.query("SELECT * FROM employee", (err, res) => {
            if (err) throw err;
    
            var employeeList = [];
            res.forEach(employee => { employeeList.push(employee.id + ": " + employee.first_name + " " + employee.last_name) });
    
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to delete?",
                    choices: employeeList
                }
            ])
                .then(answers => {
                    connect.query("DELETE FROM employee WHERE ?",
                        [
                            {
                                id: answers.employee[0],
                            }
                        ],
                        (err, res) => {
                            if (err) throw err;
                            start();
                        });
                })
        })
    }])}



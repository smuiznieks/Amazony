var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

// Create connection information for the sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bamazon'
});

// Connect to the MySQL server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log('\nWelcome to the Amazon-y Supervisor Portal. You\'re connected as id ' + connection.threadId + '.\n');
    // Once connected, prompt the user to select a supervisor action
    supervise();
});

function supervise() {
    inquirer.prompt(
        {
            name: 'action',
            type: 'rawlist',
            message: 'Select what you would like to do:',
            choices: ['View Product Sales by Department', 'Create New Department']
        }
    ).then(function(answer) {
        if (answer.action === 'View Product Sales by Department') {
            viewSales();
        } else {
            createDepartment();
        }
    });
};

function viewSales() {
    var query = 'SELECT departments.department_name, departments.department_id, departments.over_head_costs, SUM(products.product_sales) FROM departments, products WHERE products.department_name = departments.department_name GROUP BY departments.department_name, departments.department_id ORDER BY departments.department_id;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('\n');
        for (var i = 0; i < res.length; i++) {
            var sum = res[i]['SUM(products.product_sales)'];
            var cost = res[i].over_head_costs;
            var totalProfit = sum - cost;
            res[i].profit = totalProfit.toFixed(2);
        }
        console.table(res);
        connection.end();
    })
};

function createDepartment() {
    inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'Enter department name:'
        },
        {
            name: 'overhead',
            type: 'input',
            message: 'Enter overhead costs:'
            // validate:
        }
    ]).then(function(answer) {
        connection.query('INSERT INTO departments SET ?',
        {
            department_name: answer.department_name,
            over_head_costs: answer.overhead
        },
        function(err, res) {
            if (err) throw err;
            console.log('\nSuccess! Department added.\n');
            connection.end();
        });
    });
};
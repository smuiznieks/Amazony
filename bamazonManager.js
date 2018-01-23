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
    console.log('\nWelcome to the Amazon-y Manager Portal. You\'re connected as id ' + connection.threadId + '.\n');
    // Once connected, prompt the user to select a mgmt action
    manage();
});

function manage() {
    inquirer.prompt(
        {
            name: 'action',
            type: 'rawlist',
            message: 'Select what you would like to do:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ).then(function(answer) {
        if (answer.action === 'View Products for Sale') {
            view();
        } else if (answer.action === 'View Low Inventory') {
            lowInventory();
        } else if (answer.action === 'Add to Inventory') {
            addInventory();
        } else {
            addProduct();
        }
    });
};

function view() {
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        connection.end();
    });
};

function lowInventory() {
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5', function(err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        connection.end();
    });
};

function addInventory() {
    connection.query('SELECT product_name, stock_quantity FROM products', function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'product',
                type: 'rawlist',
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: 'Select item:'
            }, {
                name: 'count',
                type: 'input',
                message: 'Purchase amount:'
                // validate:
            }
        ]).then(function(answer) {
            var updatedInventory;
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.product) {
                    updatedInventory = res[i].stock_quantity;
                }
            }
            updatedInventory = (parseInt(updatedInventory) + parseInt(answer.count));
            connection.query('UPDATE products SET ? WHERE ?', 
            [
                {
                    stock_quantity: updatedInventory
                }, 
                {
                    product_name: answer.product
                }
            ], function(err, res) {
                if (err) throw err;
                console.log('\nSuccess! Stock quantity was updated.\n');
                connection.end();
            });
        });
    });
};

function addProduct() {
    inquirer.prompt([
        {
            name: 'product_name',
            type: 'input',
            message: 'Enter the product name:'
        }, {
            name: 'department_name',
            type: 'input',
            message: 'Enter department name:'
        }, {
            name: 'price',
            type: 'input',
            message: 'Enter the price:',
            // validate:
        }, {
            name: 'stock_quantity',
            type: 'input',
            message: 'Enter stock quantity:',
            // validate:
        }
    ]).then(function(answer) {
        connection.query('INSERT INTO products SET ?',
        {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price,
            stock_quantity: answer.stock_quantity
        },
        function(err, res) {
            if (err) throw err;
            console.log('\nSuccess! This item was added to the Amazon-y inventory.\n');
            connection.end();
        });
    });
};
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
    console.log('\nWelcome to Amazon-y! You\'re connected as id ' + connection.threadId + '.\n');
    // Once connected, print current inventory
    printInventory();
});

function printInventory() {
    connection.query('SELECT item_id, product_name, price FROM products', function(err, res) {
        if (err) throw err;
        console.table(res);
        // Then prompt user to enter information about their purchase
        prompt();
    });
    
};

function prompt() {
    inquirer.prompt([
        {
            name: 'product',
            type: 'input',
            message: 'Enter the item ID of the product you would like to purchase:',
            //validate: 
        }, {
            name: 'quantity',
            type: 'input',
            message: 'Enter the quantity you would like to order:',
            // validate: 
        }
    ]).then(function(answer) {
        connection.query('SELECT stock_quantity, price, product_sales FROM products WHERE ?', 
        { 
            item_id: answer.product 
        }, 
        function(err, res) {
            if (err) throw err;
            if (res[0].stock_quantity < answer.quantity) {
                // If the order amount is greater than the stock quantity, the app prevents the order from going through
                console.log('\nSorry, we do not have enough of this item in stock.\n');
                connection.end();
            } else {
                // If the stock quantity is greater than or equal to the order amount, the order total is calculated and the database is updated to reflect the new inventory count
                var total = (res[0].price * answer.quantity);
                var final = total.toFixed(2);
                console.log('\nThank you for shopping with us!\nYour total is $' + final + '\n');
                var updatedInventory = (parseInt(res[0].stock_quantity) - parseInt(answer.quantity));
                var updatedSales = (parseFloat(res[0].product_sales) + parseFloat(final));
                connection.query('UPDATE products SET ? WHERE ?',
                [
                    { 
                        stock_quantity: updatedInventory
                    },
                    {
                        item_id: answer.product
                    }
                ], 
                function(err, res) {
                    if (err) throw err;
                    //connection.end();
                });
                connection.query('UPDATE products SET ? WHERE ?', 
                [
                    {
                        product_sales: updatedSales
                    },
                    {
                        item_id: answer.product
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    connection.end();
                });
            }
        });
    });
};
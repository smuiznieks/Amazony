# Amazony

Amazon-y is an Amazon-like storefront that utlizes Node.js and MySQL to track and update inventory, sales and break-even points through it's three portals.

1. Customer View
2. Manager View
3. Supervisor View

## Getting Started

Make sure you have the correct node packages installed by running the following code in your Terminal:

`npm install`

In MySQL, `CREATE DATABASE bamazon;` and `CREATE TABLE products` using the parameters provided in **schema.sql**. Include the example values or update the "products" table with your own inventory.

To use the supervisor portal, also `CREATE TABLE departments` using the parameters provided in **schemaSupervisor.sql**. Copy example values or update the table with your own departments. Overhead costs are dummie numbers used for the purpose of this activity.

## Using Amazon-y

### Customer View

Launch the customer portal in your Terminal:

`node bamazonCustomer.js`

Users will receive a prompt to input the item ID and quantity of the product they wish to order. If the order amount is greater than the stock quantity, the app prevents the order from going through. Otherwise, the order total is calculated and the database is updated to reflect the new invetory count and total product sales.

### Manager View

Launch the manager portal in your Terminal:

`node bamazonManager.js`

Users will receive a prompt to choose one of the following actions:

* View Products for Sale, which returns all products from the inventory database to the Terminal
* View Low Inventory, which returns products with less than 5 units in the stock quanity to the Terminal
* Add to Inventory, which allows users to order more inventory for current products and updates the database
* Add New Product, which allows users to add a product to the current inventory by pushing product name, department name, price and stock quantity to the database

### Supervisor View

Launch the supervisor portal in your Terminal:

`node bamazonSupervisor.js`

Users will receive a prompt to choose one of the following actions:

* View Product Sales by Department, which prints department ID, department name, overhead costs, product sales and total profit to the Terminal by pulling data from both the "products" and "departments" tables, as well as calculating the sum of product sales per department and total profit
* Create New Department, which allows users to add a department to the current department table by pushing department name and overhead costs to the database

## Built With

* [mysql npm](https://www.npmjs.com/package/mysql)
* [inquirer npm](https://www.npmjs.com/package/inquirer)
* [console.table npm](https://www.npmjs.com/package/console.table)

### Author

* Selga Muiznieks (2018)


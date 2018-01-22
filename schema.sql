-- DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(100) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    product_sales DECIMAL(10, 2) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Oreos', 'Pantry', 2.76, 70), 
('Cheerios', 'Pantry', 2.96, 95), 
('Book', 'Books', 19.95, 22), 
('Audio book', 'Books', 9.99, 33), 
('Camera', 'Electronics', 299.98, 3), 
('Laptop', 'Electrionics', 599.00, 2), 
('Vacuum', 'Electronics', 99.50, 10), 
('Towels', 'Home', 9.90, 80), 
('Duvet', 'Home', 45.20, 12), 
('Lamp', 'Home', 25.44, 3);

SELECT * FROM products;

SET SQL_SAFE_UPDATES = 0;
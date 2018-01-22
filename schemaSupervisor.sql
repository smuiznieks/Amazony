USE bamazon;

CREATE TABLE departments (
    department_id INT(100) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs INT(100) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Pantry', 25),
('Books', 50),
('Electronics', 200),
('Home', 85);

SELECT * FROM departments;

SET SQL_SAFE_UPDATES = 0;

SELECT departments.department_name, departments.department_id, departments.over_head_costs, 
SUM(products.product_sales)
FROM departments, products 
WHERE products.department_name = departments.department_name
GROUP BY departments.department_name, departments.department_id
ORDER BY departments.department_id;
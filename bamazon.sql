DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(40) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL
);

SELECT * FROM products;


INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (10001,"GE Backup Camera","AUTO", 99.50, 10);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (20001,"Cell Phone Charger","CELL", 10.99, 50);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (30001,"Floor Mat","AUTO", 159.99, 10);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (40001,"GE Radar Detector","AUTO", 350.99, 10);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (50001,"Tire Pressure Gague","AUTO", 5.99, 50);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (60001,"Portable Jump Starter","AUTO", 49.99, 10);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (70001,"Cabin Air Filter","AUTO", 39.99, 30);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (80001,"Synthetic Engine Oil 5W-40 1 Quart","AUTO",7.99 ,20 );

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (90001,"Turning Light","AUTO", 6.99, 50);

INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) 
VALUES (90002,"Windshield Wiper driver side","AUTO", 15.99, 100);














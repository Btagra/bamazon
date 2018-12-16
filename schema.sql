CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,4) NOT NULL,
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
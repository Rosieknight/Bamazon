CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department VARCHAR(100) NOT NULL,
cost DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Lego Movie bluray", "movies", 19.99, 100);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Star Wars OT bluray", "movies", 199.99, 80);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Lord of the Rings bluray", "movies", 299.99, 30);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("The Hobbit", "books", 9.99, 200);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Welcome to Night Vale: A Novel", "books", 19.99, 70);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("The Hound of the Baskervilles", "books", 7.99, 40);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Monopoly", "games", 12.99, 50);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Pokemon Moon", "video_games", 49.99, 60);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Rogue One OST", "music", 29.99, 90);

INSERT INTO products (product_name, department, cost, stock_quantity)
VALUES ("Sgt. Pepper's Lonely Heart's Club Band", "music", 5.99, 30);
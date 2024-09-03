# webshopBackend



mysql -u root -p


CREATE TABLE CustomerDetails (
    ->     customer_id INT(11) NOT NULL AUTO_INCREMENT,
    ->     first_name VARCHAR(255) NOT NULL,
    ->     last_name VARCHAR(255) NOT NULL,
    ->     email VARCHAR(255) NOT NULL UNIQUE,
    ->     phone VARCHAR(20),
    ->     street TEXT,
    ->     city VARCHAR(255),
    ->     postal_code VARCHAR(20),
    ->     PRIMARY KEY (customer_id)
    -> );


CREATE TABLE orders (
    order_id int(11) NOT NULL AUTO_INCREMENT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_id);

ALTER TABLE orders
ADD COLUMN status ENUM('CREATED', 'CANCELED', 'FINISHED', 'IN_PROGRESS') NOT NULL DEFAULT 'CREATED';

ALTER TABLE orders
    -> ADD COLUMN customer_id INT(11) NOT NULL,
    -> ADD FOREIGN KEY (customer_id) REFERENCES customer_details(customer_id) ON DELETE CASCADE;    

INSERT INTO orders (total_price) VALUES (99.99);
INSERT INTO orders (total_price) VALUES (150.00);
INSERT INTO orders (total_price) VALUES (200.50);


 CREATE TABLE products (
    product_id INT(11) NOT NULL AUTO_INCREMENT,
    description VARCHAR(255), -- Assuming you want a description field with a max length of 255 characters
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (product_id)
);


INSERT INTO products (name,description,price) VALUES ('test product 1','test description',99.99);

 INSERT INTO products (name,description,price) VALUES ('product 2','testfaklsfas fsaj kalsfj s jflkasj fa kjasl an',434.99);



 CREATE TABLE order_items (
    order_item_id INT(11) NOT NULL AUTO_INCREMENT,
    order_id INT(11) NOT NULL,
    product_id INT(11),
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (order_item_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL
);



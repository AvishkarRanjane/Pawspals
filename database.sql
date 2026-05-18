-- =============================================
-- PAWSPALS - DATABASE SCHEMA
-- =============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS pawspals;
USE pawspals;

-- =============================================
-- CUSTOMERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    dob DATE,
    preferred_store VARCHAR(100),
    pet_preference VARCHAR(100),
    feedback LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    description LONGTEXT,
    image_url VARCHAR(500),
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_customer (customer_id),
    INDEX idx_status (status)
);

-- =============================================
-- ORDER ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
);

-- =============================================
-- CART TABLE (for persistent cart storage)
-- =============================================
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    INDEX idx_customer (customer_id)
);

-- =============================================
-- SAMPLE PRODUCTS DATA
-- =============================================
INSERT INTO products (name, category, price, description, stock_quantity) VALUES
('Chicken Kibble — 2kg', 'Dogs', 799, 'High-quality chicken kibble for dogs', 50),
('Dog Chew Toy (Durable)', 'Dogs', 299, 'Durable chew toy for dogs', 30),
('Adjustable Leash & Belt', 'Dogs', 499, 'Adjustable leash for dog training', 25),
('Stainless Food Bowl (Set of 2)', 'Dogs', 349, 'Stainless steel food bowls', 40),
('Salmon Cat Pouches (12)', 'Cats', 699, 'Salmon flavored cat pouches', 35),
('Interactive Cat Scratcher', 'Cats', 1299, 'Interactive scratching post', 15),
('Catnip Toys (3 pack)', 'Cats', 149, 'Catnip toys pack', 60),
('Premium Seed & Nut Mix', 'Birds', 349, 'Premium seed mix for birds', 45),
('Wooden Play Perch', 'Birds', 799, 'Wooden perch for birds', 20),
('Flake & Pellet Food Combo', 'Fish', 199, 'Combination fish food', 55),
('Aqua Filter (compact)', 'Fish', 1199, 'Compact aquarium filter', 12),
('Healthy Hay Bundle', 'Small Pets', 199, 'Hay for rabbits and guinea pigs', 70),
('Hamster Wheel (Silent)', 'Small Pets', 499, 'Silent running hamster wheel', 25),
('Travel Carrier (M)', 'Accessories', 1999, 'Medium travel carrier', 18),
('Grooming Kit (All-in-1)', 'Accessories', 649, 'All-in-one grooming kit', 30);

-- =============================================
-- SAMPLE CUSTOMER DATA (for testing)
-- =============================================
INSERT INTO customers (name, email, password, gender, dob, preferred_store, pet_preference, feedback) VALUES
('John Doe', 'john@example.com', '$2y$10$jCLRbr11K5TdqZxL5v2Pae8uXiPKv/PZP9fCCHJ8u9m1R.FjZYVQu', 'Male', '1990-05-15', 'Delhi Store', 'Dogs', 'Great selection of dog products'),
('Sarah Smith', 'sarah@example.com', '$2y$10$jCLRbr11K5TdqZxL5v2Pae8uXiPKv/PZP9fCCHJ8u9m1R.FjZYVQu', 'Female', '1992-08-22', 'Mumbai Store', 'Cats', 'Love the cat collection');

-- =============================================
-- CREATE VIEWS FOR REPORTS
-- =============================================
CREATE VIEW customer_orders AS
SELECT 
    c.id,
    c.name,
    c.email,
    c.pet_preference,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email, c.pet_preference;

CREATE VIEW sales_by_category AS
SELECT 
    p.category,
    COUNT(oi.id) as items_sold,
    SUM(oi.price * oi.quantity) as total_revenue
FROM order_items oi
JOIN products p ON oi.product_name = p.name
GROUP BY p.category;

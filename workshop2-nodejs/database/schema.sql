-- ============================================
-- Warehouse Rental Management System Database
-- MySQL 8.0+ Schema
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS warehouse_rental_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE warehouse_rental_db;

-- ============================================
-- Table: role
-- Description: User roles (Employee, Supervisor, Admin)
-- ============================================
CREATE TABLE IF NOT EXISTS role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    INDEX idx_role_name (role_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default roles
INSERT INTO role (role_name) VALUES 
('Employee'),    -- role_id = 1
('Supervisor'),  -- role_id = 2
('Admin')        -- role_id = 3
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- ============================================
-- Table: user
-- Description: System users (employees, supervisors, admins)
-- ============================================
CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NULL,
    user_phone VARCHAR(20) NULL,
    user_address VARCHAR(255) NULL,
    role_id INT NULL,
    user_status VARCHAR(50) DEFAULT '1',
    INDEX idx_user_name (user_name),
    INDEX idx_role_id (role_id),
    INDEX idx_user_status (user_status),
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: company
-- Description: Companies that rent warehouses
-- ============================================
CREATE TABLE IF NOT EXISTS company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NULL,
    company_firstname VARCHAR(100) NULL,
    company_lastname VARCHAR(100) NULL,
    company_email VARCHAR(100) NULL,
    company_phone VARCHAR(20) NULL,
    company_address VARCHAR(255) NULL,
    INDEX idx_company_name (company_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: warehouse
-- Description: Available warehouses for rent
-- ============================================
CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
    warehouse_address VARCHAR(255) NULL,
    warehouse_name VARCHAR(100) NULL,
    warehouse_size DECIMAL(10,2) NULL COMMENT 'Size in square meters',
    warehouse_status VARCHAR(100) DEFAULT 'Active',
    INDEX idx_warehouse_status (warehouse_status),
    INDEX idx_warehouse_name (warehouse_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: rental
-- Description: Warehouse rental records
-- ============================================
CREATE TABLE IF NOT EXISTS rental (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    user_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    date_rental_start DATETIME NOT NULL,
    date_rental_end DATETIME NULL,
    rental_status VARCHAR(100) NOT NULL,
    description VARCHAR(100) NULL,
    INDEX idx_company_id (company_id),
    INDEX idx_user_id (user_id),
    INDEX idx_warehouse_id (warehouse_id),
    INDEX idx_rental_status (rental_status),
    INDEX idx_date_rental_start (date_rental_start),
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: cancel_rental
-- Description: Records of cancelled rentals
-- ============================================
CREATE TABLE IF NOT EXISTS cancel_rental (
    cancel_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    user_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    date_cancel_rental DATETIME NULL,
    description VARCHAR(250) NULL,
    INDEX idx_company_id (company_id),
    INDEX idx_warehouse_id (warehouse_id),
    INDEX idx_date_cancel (date_cancel_rental)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: number1 (CIM)
-- Description: CIM records
-- ============================================
CREATE TABLE IF NOT EXISTS number1 (
    cim_id INT AUTO_INCREMENT PRIMARY KEY,
    cim VARCHAR(255) NULL,
    INDEX idx_cim (cim)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Insert sample company
INSERT INTO company (company_name, company_firstname, company_lastname, company_email, company_phone, company_address)
VALUES ('ABC Corporation', 'John', 'Smith', 'contact@abc.com', '0812345678', '456 Business District, Bangkok');

-- Insert sample warehouse
INSERT INTO warehouse (warehouse_name, warehouse_address, warehouse_size, warehouse_status)
VALUES 
('Warehouse A', '123 Industrial Zone, Bangkok', 1500.00, 'Active'),
('Warehouse B', '456 Storage Park, Bangkok', 2000.50, 'Active'),
('Warehouse C', '789 Logistics Center, Bangkok', 1200.00, 'Active');

-- ============================================
-- Verify tables created
-- ============================================
SHOW TABLES;

-- ============================================
-- Check table structures
-- ============================================
-- DESCRIBE role;
-- DESCRIBE user;
-- DESCRIBE company;
-- DESCRIBE warehouse;
-- DESCRIBE rental;
-- DESCRIBE cancel_rental;
-- DESCRIBE number1;

SELECT 'Database schema created successfully!' AS Status;

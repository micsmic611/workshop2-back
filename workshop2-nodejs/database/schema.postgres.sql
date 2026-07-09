-- ============================================
-- Warehouse Rental Management System Database
-- PostgreSQL Schema (Compatible with Supabase)
-- ============================================

-- Create database (skip this in Supabase - use default 'postgres' database)
-- CREATE DATABASE warehouse_rental_db;

-- ============================================
-- Table: role
-- Description: User roles (Employee, Supervisor, Admin)
-- ============================================
CREATE TABLE IF NOT EXISTS role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_role_name ON role(role_name);

-- Insert default roles
INSERT INTO role (role_name) VALUES 
('Employee'),    -- role_id = 1
('Supervisor'),  -- role_id = 2
('Admin')        -- role_id = 3
ON CONFLICT DO NOTHING;

-- ============================================
-- Table: "user"
-- Description: System users (employees, supervisors, admins)
-- Note: "user" is a reserved word in PostgreSQL, so we quote it
-- ============================================
CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NULL,
    user_phone VARCHAR(20) NULL,
    user_address VARCHAR(255) NULL,
    role_id INTEGER NULL,
    user_status VARCHAR(50) DEFAULT '1',
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_user_name ON "user"(user_name);
CREATE INDEX IF NOT EXISTS idx_role_id ON "user"(role_id);
CREATE INDEX IF NOT EXISTS idx_user_status ON "user"(user_status);

-- ============================================
-- Table: company
-- Description: Companies that rent warehouses
-- ============================================
CREATE TABLE IF NOT EXISTS company (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NULL,
    company_firstname VARCHAR(100) NULL,
    company_lastname VARCHAR(100) NULL,
    company_email VARCHAR(100) NULL,
    company_phone VARCHAR(20) NULL,
    company_address VARCHAR(255) NULL
);

CREATE INDEX IF NOT EXISTS idx_company_name ON company(company_name);

-- ============================================
-- Table: warehouse
-- Description: Available warehouses for rent
-- ============================================
CREATE TABLE IF NOT EXISTS warehouse (
    warehouse_id SERIAL PRIMARY KEY,
    warehouse_address VARCHAR(255) NULL,
    warehouse_name VARCHAR(100) NULL,
    warehouse_size DECIMAL(10,2) NULL,
    warehouse_status VARCHAR(100) DEFAULT 'Active'
);

CREATE INDEX IF NOT EXISTS idx_warehouse_status ON warehouse(warehouse_status);
CREATE INDEX IF NOT EXISTS idx_warehouse_name ON warehouse(warehouse_name);

COMMENT ON COLUMN warehouse.warehouse_size IS 'Size in square meters';

-- ============================================
-- Table: rental
-- Description: Warehouse rental records
-- ============================================
CREATE TABLE IF NOT EXISTS rental (
    rental_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    date_rental_start TIMESTAMP NOT NULL,
    date_rental_end TIMESTAMP NULL,
    rental_status VARCHAR(100) NOT NULL,
    description VARCHAR(100) NULL,
    FOREIGN KEY (company_id) REFERENCES company(company_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(warehouse_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_rental_company_id ON rental(company_id);
CREATE INDEX IF NOT EXISTS idx_rental_user_id ON rental(user_id);
CREATE INDEX IF NOT EXISTS idx_rental_warehouse_id ON rental(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_rental_status ON rental(rental_status);
CREATE INDEX IF NOT EXISTS idx_rental_date_start ON rental(date_rental_start);

-- ============================================
-- Table: cancel_rental
-- Description: Records of cancelled rentals
-- ============================================
CREATE TABLE IF NOT EXISTS cancel_rental (
    cancel_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    warehouse_id INTEGER NOT NULL,
    date_cancel_rental TIMESTAMP NULL,
    description VARCHAR(250) NULL
);

CREATE INDEX IF NOT EXISTS idx_cancel_company_id ON cancel_rental(company_id);
CREATE INDEX IF NOT EXISTS idx_cancel_warehouse_id ON cancel_rental(warehouse_id);
CREATE INDEX IF NOT EXISTS idx_cancel_date ON cancel_rental(date_cancel_rental);

-- ============================================
-- Table: number1 (CIM)
-- Description: CIM records
-- ============================================
CREATE TABLE IF NOT EXISTS number1 (
    cim_id SERIAL PRIMARY KEY,
    cim VARCHAR(255) NULL
);

CREATE INDEX IF NOT EXISTS idx_cim ON number1(cim);

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Insert sample company
INSERT INTO company (company_name, company_firstname, company_lastname, company_email, company_phone, company_address)
VALUES ('ABC Corporation', 'John', 'Smith', 'contact@abc.com', '0812345678', '456 Business District, Bangkok')
ON CONFLICT DO NOTHING;

-- Insert sample warehouse
INSERT INTO warehouse (warehouse_name, warehouse_address, warehouse_size, warehouse_status)
VALUES 
('Warehouse A', '123 Industrial Zone, Bangkok', 1500.00, 'Active'),
('Warehouse B', '456 Storage Park, Bangkok', 2000.50, 'Active'),
('Warehouse C', '789 Logistics Center, Bangkok', 1200.00, 'Active')
ON CONFLICT DO NOTHING;

-- ============================================
-- Verify tables created
-- ============================================
SELECT 'Database schema created successfully!' AS status;

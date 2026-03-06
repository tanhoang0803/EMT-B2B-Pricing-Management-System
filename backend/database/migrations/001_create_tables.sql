-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Customer Groups
CREATE TABLE IF NOT EXISTS customer_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  customer_type VARCHAR(20) NOT NULL DEFAULT 'Individual' CHECK (customer_type IN ('Individual', 'Organization')),
  group_id INTEGER REFERENCES customer_groups(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Pricing Templates
CREATE TABLE IF NOT EXISTS pricing_templates (
  id SERIAL PRIMARY KEY,
  template_name VARCHAR(255) NOT NULL,
  price_type VARCHAR(50) NOT NULL CHECK (price_type IN ('meal_package','government','enterprise','individual','customer_group','custom')),
  description TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Pricing Table (entries)
CREATE TABLE IF NOT EXISTS pricing_table (
  id SERIAL PRIMARY KEY,
  template_id INTEGER NOT NULL REFERENCES pricing_templates(id) ON DELETE CASCADE,
  customer_group_id INTEGER REFERENCES customer_groups(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

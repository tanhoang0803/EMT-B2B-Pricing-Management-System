-- Admin user (password: admin123)
-- Hash generated via: node -e "require('bcryptjs').hash('admin123',10).then(console.log)"
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@emt.com', '$2a$10$p0qeITi1Ec42Bc9HFZUMPer9TsW9jQAkwvwX/MUy.zH4ET2u1MRAy', 'admin')
ON CONFLICT DO NOTHING;

-- Customer groups
INSERT INTO customer_groups (name, description) VALUES
('Government', 'Government and public sector organizations'),
('Enterprise', 'Large enterprise clients'),
('Individual', 'Individual customers'),
('Meal Package', 'Clients on meal package plans'),
('Custom', 'Custom agreement clients')
ON CONFLICT DO NOTHING;

-- Sample customers
INSERT INTO customers (name, email, phone, customer_type, group_id) VALUES
('Ministry of Finance', 'contact@mof.gov', '0123456789', 'Organization', 1),
('TechCorp Ltd', 'info@techcorp.com', '0987654321', 'Organization', 2),
('John Doe', 'john.doe@email.com', '0111222333', 'Individual', 3)
ON CONFLICT DO NOTHING;

-- Sample pricing templates
INSERT INTO pricing_templates (template_name, price_type, description) VALUES
('Government Standard', 'government', 'Standard pricing for government contracts'),
('Enterprise Package', 'enterprise', 'Volume pricing for enterprise clients'),
('Meal Deal Plan', 'meal_package', 'Monthly meal package pricing')
ON CONFLICT DO NOTHING;

-- Sample pricing entries
INSERT INTO pricing_table (template_id, customer_group_id, product_name, price) VALUES
(1, 1, 'Product A', 100.00),
(1, 1, 'Product B', 150.00),
(2, 2, 'Product A', 90.00),
(2, 2, 'Product C', 200.00),
(3, 4, 'Meal Set 1', 50.00),
(3, 4, 'Meal Set 2', 75.00);

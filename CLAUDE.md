# CLAUDE.md — EMT & B2B Pricing Management System

## Project Purpose

This system serves two integrated modules:
- **EMT (Enterprise Management Tool)** — manages internal operational data for enterprise staff.
- **B2B Pricing Management System** — manages flexible pricing models across different customer segments.

---

## Architecture Overview

```
Frontend (React / Vue)
        |
Backend API (Node.js / Java Spring Boot)
        |
   +---------+-----------+
   |                     |
EMT Module        Pricing Engine
(Internal Data)   (Templates & Tables)
   |                     |
   +----------+----------+
              |
         Database (MySQL / PostgreSQL)
```

---

## Project Structure (Planned)

```
EMT_B2B_Pricing_Management_System/
├── frontend/               # React or Vue UI
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level views
│   │   ├── services/       # API call wrappers
│   │   └── store/          # State management
│   └── package.json
│
├── backend/                # Node.js or Java Spring Boot
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Database models / entities
│   │   ├── routes/         # API route definitions
│   │   └── middleware/     # Auth, validation, error handling
│   └── package.json / pom.xml
│
├── database/
│   ├── migrations/         # Schema migration scripts
│   └── seeds/              # Seed data for development
│
├── docs/                   # Additional documentation
├── .env.example            # Environment variable template
├── README.md
└── CLAUDE.md
```

---

## Core Modules

### 1. EMT — Enterprise Management Tool
- Manage internal staff-facing data
- CRUD for enterprise operational records
- Protected by role-based access control (RBAC)

### 2. B2B Pricing Engine
- 6 pricing code types:
  1. Meal packages
  2. Government organizations
  3. Enterprises
  4. Individual customers
  5. Customer groups
  6. Custom pricing configurations
- Pricing templates auto-generate pricing tables
- Templates are assigned to customer groups

### 3. Customer Management
- Customer types: Individual / Organization
- Customer groups for bulk pricing assignment

### 4. Order Management
- Orders reference customer + pricing table
- Total price derived from active pricing rules

---

## Database Schema

### customers
| Field         | Type    | Notes                     |
|---------------|---------|---------------------------|
| id            | INT PK  | Auto-increment            |
| name          | VARCHAR |                           |
| customer_type | VARCHAR | Individual / Organization |
| group_id      | INT FK  | References customer group |

### pricing_templates
| Field         | Type     | Notes            |
|---------------|----------|------------------|
| id            | INT PK   |                  |
| template_name | VARCHAR  |                  |
| price_type    | VARCHAR  | One of 6 types   |
| created_at    | DATETIME |                  |

### pricing_table
| Field          | Type    | Notes                    |
|----------------|---------|--------------------------|
| id             | INT PK  |                          |
| template_id    | INT FK  | References template      |
| customer_group | VARCHAR |                          |
| product_name   | VARCHAR |                          |
| price          | DECIMAL |                          |

### orders
| Field       | Type     | Notes               |
|-------------|----------|---------------------|
| order_id    | INT PK   |                     |
| customer_id | INT FK   | References customer |
| total_price | DECIMAL  |                     |
| created_at  | DATETIME |                     |

---

## API Reference

### Customers
| Method | Endpoint              | Description     |
|--------|-----------------------|-----------------|
| GET    | /api/customers        | List customers  |
| POST   | /api/customers        | Create customer |
| PUT    | /api/customers/{id}   | Update customer |

### Pricing
| Method | Endpoint                   | Description              |
|--------|----------------------------|--------------------------|
| GET    | /api/pricing/templates     | List templates           |
| POST   | /api/pricing/templates     | Create template          |
| POST   | /api/pricing/generate      | Generate pricing table   |

### Orders
| Method | Endpoint       | Description   |
|--------|----------------|---------------|
| GET    | /api/orders    | List orders   |
| POST   | /api/orders    | Create order  |

---

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React or Vue                  |
| Backend    | Node.js or Java Spring Boot   |
| Database   | MySQL or PostgreSQL            |
| API Style  | RESTful                       |
| Auth       | JWT (planned)                 |
| Version Control | Git / GitHub             |

---

## Coding Conventions

- Use RESTful naming: plural nouns for resources (`/customers`, `/orders`)
- Controllers handle HTTP only — business logic lives in services
- All DB access goes through model/repository layer
- Validate inputs at the API boundary; trust internal data
- Use `.env` for all secrets and config — never hardcode credentials
- Database changes via migration scripts only — no manual schema edits

---

## Workflow: Pricing Template

```
Admin creates pricing template
        |
Define price_type (one of 6 types)
        |
Assign template to customer group
        |
System auto-generates pricing_table rows
        |
Customers use active pricing on order creation
```

---

## Environment Variables (.env)

```
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
PORT=
```

---

## Future Roadmap

- AI-driven pricing automation and suggestions
- Dynamic pricing based on demand
- Advanced analytics dashboard
- ERP system integration
- Customer behavior analysis

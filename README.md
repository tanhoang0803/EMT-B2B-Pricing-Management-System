# EMT & B2B Pricing Management System

A full-stack enterprise platform for managing internal operational data and flexible B2B pricing configurations across multiple customer segments.

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://emt-b2b-pricing-management-system.onrender.com |
| Backend API | https://emt-b2b-pricing-management-system-production.up.railway.app |

**Demo credentials:**
- Email: `admin@emt.com`
- Password: `admin123`

---

## Overview

The system is split into two integrated modules:

- **EMT (Enterprise Management Tool)** — internal data management for enterprise staff, protected by role-based access control.
- **B2B Pricing Management System** — manages pricing templates, pricing tables, and order pricing across 6 customer segment types.

---

## Key Features

- Customer management with type and group segmentation
- 6 B2B pricing code types (meal packages, government, enterprise, individual, group, custom)
- Pricing template system that auto-generates pricing tables
- Order management with pricing automatically applied by customer group
- RESTful API for all operations
- Role-based access for internal staff

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18 + Vite             |
| Backend    | Node.js + Express           |
| Database   | PostgreSQL + Sequelize ORM  |
| API        | RESTful                     |
| Auth       | JWT                         |
| Hosting    | Render (frontend) + Railway (backend + DB) |

---

## System Architecture

```
Frontend (React / Vue)
        |
Backend API (Node.js / Java Spring Boot)
        |
   +---------+-----------+
   |                     |
EMT Module        Pricing Engine
   |                     |
   +----------+----------+
              |
         Database (MySQL / PostgreSQL)
```

---

## Pricing Workflow

```
Admin creates pricing template
        |
Define price type (1 of 6 types)
        |
Assign template to customer group
        |
Pricing table auto-generated
        |
Applied automatically on order creation
```

---

## API Endpoints

| Method | Endpoint                 | Description            |
|--------|--------------------------|------------------------|
| GET    | /api/customers           | List customers         |
| POST   | /api/customers           | Create customer        |
| PUT    | /api/customers/{id}      | Update customer        |
| GET    | /api/pricing/templates   | List pricing templates |
| POST   | /api/pricing/templates   | Create template        |
| POST   | /api/pricing/generate    | Generate pricing table |
| GET    | /api/orders              | List orders            |
| POST   | /api/orders              | Create order           |

---

## Getting Started

### Prerequisites

- Node.js or Java 17+
- MySQL or PostgreSQL
- Git

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd EMT_B2B_Pricing_Management_System

# Configure environment
cp .env.example .env
# Fill in DB credentials and JWT secret in .env

# Install dependencies (Node.js backend)
cd backend && npm install

# Run database migrations
npm run migrate

# Start the backend
npm run dev

# Start the frontend
cd ../frontend && npm install && npm run dev
```

---

## Project Structure

```
EMT_B2B_Pricing_Management_System/
├── frontend/        # UI (React / Vue)
├── backend/         # API server (Node.js / Spring Boot)
├── database/        # Migrations and seed data
├── docs/            # Additional documentation
├── .env.example     # Environment variable template
├── README.md
└── CLAUDE.md        # Architecture and dev instructions
```

---

## Roadmap

- [ ] AI-driven pricing suggestions
- [ ] Dynamic pricing engine
- [ ] Analytics dashboard
- [ ] ERP integration
- [ ] Customer behavior analysis

---

## Author

**TanQHoang** — Software Developer (Fresher)

This project demonstrates enterprise system design, pricing engine architecture, and scalable full-stack development.

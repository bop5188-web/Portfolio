# Bakery Storefront (MySQL) — Notes + Queries

This folder contains the SQL work from a school assignment for an artisanal bakery storefront.

## Scope (modeled relational data)

- `customers` (name, phone, email)
- `employees` (name, position, hourly wage)
- `orders` (date, pickup/delivery, total, linked to customer + employee)
- `products` (name, category, price)
- `ingredients` (name)
- `suppliers` (name, contact info)
- join tables for product/ingredient combinations
- inventory tables for products + ingredients
- invoices (status + payment method)

## What to add next (so the SQL is fully runnable)

If you paste your finalized `.sql` schema + inserts (from MySQL Workbench export) into this folder, I can wire the portfolio to a true in-browser SQL runner too.


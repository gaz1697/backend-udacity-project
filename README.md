# Storefront Backend Project

## Getting Started

This repo contains a udacity course storefront backend project, the backend is used to store the storefront data and to receive requests regarding the data through exposed endpoints.

## Technologies

the backend employs the following technologies:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Database Tables

- Table: products (id:SERIAL PRIMARY KEY, p_name:varchar(300), price:numeric, category:varchar(300))

- Table: users (id:SERIAL PRIMARY KEY, first_name:varchar(255), last_name:varchar(255), password:varchar(256))

- Table: orders (id:SERIAL PRIMARY KEY, order_status:varchar(100), user_id: foreign key references users:id)

- Table: order_products (order_id: foreign key references orders:id, product_id:foreign key references products:id, quantity: int)

## Endpoints

-

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

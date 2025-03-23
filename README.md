# Storefront Backend Project

## Getting Started

This repo contains a udacity course storefront backend project, the backend is used to store the storefront data and to receive requests regarding the data through exposed endpoints.

---

## Technologies

The backend employs the following technologies:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

---

### Instructions for Setting up and Running the Backend

**Prerequisites**

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

**Setup**

1. Download or clone the project repository.
2. Open the project folder in your terminal.
3. Run `npm install` to install all required dependencies.

**Starting the Project**

- From the project folder, run `npm start` to launch the backend server.

**Testing the Project**

- From the project folder, run `npm test` to execute the test suite.

---

## Database Tables

- Table: products (id:SERIAL PRIMARY KEY, p_name:varchar(300), price:numeric, category:varchar(300))

- Table: users (id:SERIAL PRIMARY KEY, first_name:varchar(255), last_name:varchar(255), password:varchar(256))

- Table: orders (id:SERIAL PRIMARY KEY, order_status:varchar(100), user_id: foreign key references users:id)

- Table: order_products (order_id: foreign key references orders:id, product_id:foreign key references products:id, quantity: int)

---

## Endpoints

### Main Page

**`GET /`**

- **Returns**: The main application page.
- **Purpose**: Serves as the home page for the application.

---

### users

**`GET /user/`**

- **Returns**:  
  A list of all users.
- **Purpose**:  
  Retrieve all user profiles.

---

**`GET /user/:id`**

- **Returns**:  
  A specific user, identified by its `:id`.
- **Purpose**:  
  Retrieve details about a single user.
- **Token Required**

---

**`POST /user`**

- **Parameters**:
  - **first_name** (string): e.g., `"Alice"`.
  - **last_name** (string): e.g., `"Smith"`.
  - **password** (string): e.g., `"SecurePassword"`.
- **Returns**:  
  The newly created user.
- **Purpose**:  
  Create a new user .

---

**`POST /user/login`**

- **Parameters**:
  - **id** (string): The user’s identifier, e.g., `"123"`.
  - **password** (string): The user’s password, e.g., `"SecurePassword"`.
- **Returns**:
  - A JWT token if the credentials are valid.
  - An error message if the provided `id` or password is incorrect.
- **Purpose**:  
  Authenticate a user and return a token for subsequent requests.

---

### products

**`GET /product/`**

- **Returns**:  
  A list of all products.
- **Purpose**:  
  Retrieve all existing products.

---

**`GET /product/:id`**

- **Returns**:  
  A specific product, identified by its `:id`.
- **Purpose**:  
  Retrieve details about a single product.

---

**`POST /product`**

- **Parameters**:
  - **p_name** (string): Name of the product, e.g., `"Apple"`.
  - **price** (number): Price of the product, e.g., `2.99`.
  - **category** (string): Category or type of the product, e.g., `"Fruits"`.
- **Returns**:  
  The newly created product.
- **Purpose**:  
  Create a new product in the store.
- **Token Required**

---

### orders

**`GET /order/`**

- **Returns**:  
  A list of all orders.
- **Purpose**:  
  Retrieve all existing orders.

---

**`GET /order/:id`**

- **Returns**:  
  A specific order, identified by its `:id`.
- **Purpose**:  
  Retrieve detailed information about a single order.
- **Token Required**

---

**`GET /order/active/:id`**

- **Returns**:  
  All active orders associated with the user specified by `:id`.
- **Purpose**:  
  Retrieve active (ongoing) orders for a specific user.

---

**`POST /order`**

- **Parameters**:
  - **status** (string): The status of the order (e.g., `"active"`, `"complete"`).
  - **user_id** (number): The ID of the user who owns this order.
- **Returns**:  
  The newly created order object.
- **Purpose**:  
  Create a new order for a given user.
- **Token Required**

---

**`POST /order_product`**

- **Parameters**:
  - **order_id** (number): The ID of the order to which the product should be added.
  - **product_id** (number): The ID of the product to be added.
  - **quantity** (number): The quantity of the product to be added.
- **Returns**:  
  The newly created order-product.
- **Purpose**:  
  Add a product to an existing order.
- **Token Required**

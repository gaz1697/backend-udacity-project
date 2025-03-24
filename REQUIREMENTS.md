# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


---

## Database Tables

- Table: products (id:SERIAL PRIMARY KEY, p_name:varchar(300), price:numeric, category:varchar(300))

- Table: users (id:SERIAL PRIMARY KEY, first_name:varchar(255), last_name:varchar(255), password:varchar(256))

- Table: orders (id:SERIAL PRIMARY KEY, order_status:varchar(100), user_id: foreign key references users:id)

- Table: order_products (order_id: foreign key references orders:id, product_id:foreign key references products:id, quantity: int)

---


## API Endpoints



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


---

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

**setting up the database**

- start psql 
- create a database with the name psqlexpressapi and a database with the name psqlexpressapi_test
- create a file with the name database.json and copy the content of the database.json.example into it and adjust the information as relevant to your enviroment

**setting up enviroment variables**

-- create a file named .env and copy the provided information in the enviroment variables section of this document into it
-- adjust the POSTGRES_USER and POSTGRES_PASSWORD with your relevant information

**Starting the Project**

- From the project folder, run `npm start` to launch the backend server.

**Testing the Project**

- From the project folder, run `npm test` to execute the test suite.
---

### Enviroment Variables


- **ServerPortNumber** PORT=3000
- **DB Host** POSTGRES_HOST=127.0.0.1
- **DB Name** POSTGRES_DB=psqlexpressapi
- **DB User** POSTGRES_USER=username
- **DB Password** POSTGRES_PASSWORD=Password
- **Bcrypt password** BCRYPT_PASSWORD=dofpjdr4nf4o32p4ifjkj4223frkvmkv59$
- **SALT** SALT_ROUNDS=10

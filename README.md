# Microbe Formulas Address Book Assessment
This project represents the backend for a theoretical company contact directory that utilizes the following technologies from Microbe Formulas' new backend tech stack:
- Node.js
- Express.js
- GraphQL
- MySQL

## Setup Project Locally
```sh
# Clone this project
git clone (insert link)

# Install project dependences
npm install
```

This project requires a MySQL database. You can install MySQL for Linux, Mac, or Windows at <https://www.mysql.com/downloads/> and instructions for running a MySQL database locally (or on a server) can be found at <https://dev.mysql.com/doc/>.

Once the MySQL server has been started, a new database and table need to be created. I recommend using MySQL Workbench for running the following SQL queries:
```sql
-- Creates a new database
CREATE DATABASE address_book;

-- Uses the database for the following queries
USE address_book;

-- Creates a new database table
CREATE TABLE persons (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    email VARCHAR(128),
    phone VARCHAR(15),
    role VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

-- (Optional) Populate the table with example rows
INSERT INTO persons (firstName, lastName, email, phone, role)
VALUES ("Rhett", "Hancock", "hancockrhett@gmail.com", "2082832763", "Back End Developer");

INSERT INTO persons (firstName, lastName, email, phone, role)
VALUES ("Michael", "Roberts", "michael.roberts@email.com", "2085556666", "Front End Developer");

INSERT INTO persons (firstName, lastName, email, phone, role)
VALUES ("Alice", "Jones", "alice.jones@email.com", "2084564477", "Graphic Designer");

INSERT INTO persons (firstName, lastName, email, phone, role)
VALUES ("Monica", "Alberts", "monicaalberts@email.com", "4025556666", "Data Analyst");

INSERT INTO persons (firstName, lastName, email, phone, role)
VALUES ("Avery", "Johnson", "avery.jo@gmail.com", "2084459922", "Full-Stack Engineer");
```

Please note that these SQL queries can be found in sql/create.sql.

Once the MySQL database is ready, the mysql-connector.js file needs to be updated with the parameters used to configure your MySQL database:
- host
- user
- password
- database

Finally, the project is ready to be run and used:
```sh
# Run GraphQL server
node index

# Access GraphiQL
http://localhost:4000/graphql
```

## Example Operations
### Get person by ID
```js
{
  person(id: 1) {
    id
    firstName
    lastName
    email
    phone
    role
  }
}
```
### Get all persons
```js
{
  persons {
    id
    firstName
    lastName
    email
    phone
    role
  }
}
```
### Get all persons name and role
```js
{
  persons {
    firstName
    lastName
    role
  }
}
```
### Create a new person
```js
mutation {
  createPerson(
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "2086667878"
    role: "Back End Engineer"
  ) {
    id
  }
}
```
### Update a person
```js
mutation {
  updatePerson(
    id: 6
    firstName: "John",
    lastName: "Smith",
    email: "john.smith24@email.com",
    phone: "2086667878",
    role: "Back End Engineer"
  ) {
    id
    firstName
    lastName
    email
    phone
    role
  }
}
```
### Delete a person
```js
mutation {
  deletePerson(id: 6) {
    affectedRows
  }
}
```
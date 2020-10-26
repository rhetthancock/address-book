# Design Decisions
To complete this assignment, there were a number of design decisions to be made. This began with the MySQL database:
- I separated the name fields into first and last name to organize the data and allow for more specific queries.
- The email address is represented by a large string to accomodate very long email addresses. However, in a production environment I would consider increasing it even larger.
- The phone number is represented as a string (instad of an integer) to accomodate international phone numers, various formatting, and non-numeric characters that may appear, such as the + sign.
- When I began the assignment, I considered having a separate database table for the role within the company, but decided to keep things simple and store the role as a string in the same table.

Additionally, when it comes to the structure of the project files, I chose to organize them by type. This was done because it was consistent with the examples that I encountered, and would be intuitive for other developers that may work on the project:
- Database files are contained in the db folder, including the MySQL connector, wrapper and database access object.
- The model folder contains all of the GraphQL object models, as well as their associated query and mutations.
- The schema folder contains the files that actually construct the GraphQL schema using the resources in the model folder.

# What would I do differently?
For this assignment, I very quickly wanted to over-engineer everything. This lead to some trouble getting the basic functionality of the project working in the beginning. I decided to take a step back and implement the core features.

As I was unfamiliar with GraphQL prior to this project, I spent a great deal of time learning how it is used through YouTube, GraphQL documentation, and viewing examples. If I were to do a similar project in the future, I would have a much better idea of where to start because of this.

Given more time, I would be interested in implementing each of the extra features, including user authentication and providing a custom user interface to show off my full-stack capabilities. However, for the sake of time I decided to stick to the core functionality for this assignment.

Additionally, I would have liked the project to automatically setup the database table (if it did not already exist) when the project is started (and the database configuration has been provided). More importantly, I would have liked to expand the database to multiple tables and experiment with joins when querying data. Furthermore, the updateUser function could be improved so the user only needs to provide the ID and fields to be updated, instead of all the fields.
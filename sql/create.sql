-- Creates new database table 
CREATE TABLE persons (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    email VARCHAR(128),
    phone VARCHAR(15),
    role VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

-- (Optional) Inserts example data into table
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
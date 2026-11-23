-- Disposable database for CI only. Never import over an existing COLORS database.
CREATE TABLE Users (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  Login VARCHAR(50) NOT NULL,
  Password VARCHAR(50) NOT NULL
);

CREATE TABLE Colors (
  ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(50) NOT NULL,
  UserID INT NOT NULL
);

INSERT INTO Users (ID, firstName, lastName, Login, Password)
VALUES (1, 'Test', 'Student', 'ci_student', 'ci_password');

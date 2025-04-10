const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL database.");

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('student', 'profesor') NOT NULL DEFAULT 'student',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  db.query(createUsersTable, (err, result) => {
    if (err) {
      console.error("Error creating users table: " + err.message);
    } else {
      console.log("Table 'users' is ready.");
    }
  });

  const createCoursesTable = `
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      sessions INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      available_spots INT NOT NULL,
      languages VARCHAR(255) NOT NULL
    );
  `;

  db.query(createCoursesTable, (err, result) => {
    if (err) {
      console.error("Error creating courses table: " + err.message);
    } else {
      console.log("Table 'courses' is ready.");
    }
  });

  const createEnrollmentsTable = `
  CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
`;

  db.query(createEnrollmentsTable, (err, result) => {
    if (err) {
      console.error("Error creating enrollments table: " + err.message);
    } else {
      console.log("Table 'enrollments' is ready.");
    }
  });
});

module.exports = db;

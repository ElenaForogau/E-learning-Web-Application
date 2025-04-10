const db = require("../config/db");

class UserRepository {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, first_name, last_name, email, role FROM users WHERE id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  static async createUser(firstName, lastName, email, hashedPassword, role) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword, role],
        (err, result) => {
          if (err) reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
}

module.exports = UserRepository;

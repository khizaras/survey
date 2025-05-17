// User model for MySQL
const db = require("../config/db");

const User = {
  // Example CRUD stubs
  async create(data) {
    try {
      // Insert user and return new user id
      const [result] = await db.query(
        "INSERT INTO users (name, email, department, sso_id) VALUES (?, ?, ?, ?)",
        [data.name, data.email, data.department, data.sso_id]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findBySSOId(sso_id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE sso_id = ?", [
        sso_id,
      ]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // ...other user model methods
};

module.exports = User;

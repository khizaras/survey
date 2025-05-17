// Vote model for MySQL
const db = require("../config/db");

module.exports = {
  // Example CRUD stubs
  async create(data) {
    // Insert vote and return new vote id
    try {
      const [result] = await db.query(
        "INSERT INTO votes (user_id, poll_id, question_id, option_id) VALUES (?, ?, ?, ?)",
        [data.user_id, data.poll_id, data.question_id, data.option_id]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findByPollId(poll_id) {
    try {
      const [rows] = await db.query("SELECT * FROM votes WHERE poll_id = ?", [
        poll_id,
      ]);
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findByUserIdAndPollId(user_id, poll_id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM votes WHERE user_id = ? AND poll_id = ?",
        [user_id, poll_id]
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // ...other vote model methods
};

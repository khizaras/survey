// Option model for MySQL
const db = require("../config/db");

const Option = {
  // Example CRUD stubs
  async create(data) {
    try {
      // Insert option and return new option id
      const [result] = await db.query(
        "INSERT INTO options (question_id, option_text) VALUES (?, ?)",
        [data.question_id, data.option_text]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findByQuestionId(question_id) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM options WHERE question_id = ?",
        [question_id]
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // ...other option model methods
};

module.exports = Option;

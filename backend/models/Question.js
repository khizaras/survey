// Question.js
const db = require("../config/db");

const Question = {
  async create({ poll_id, question_text, type, image_url }) {
    const [result] = await db.query(
      "INSERT INTO questions (poll_id, question_text, type, image_url) VALUES (?, ?, ?, ?)",
      [poll_id, question_text, type, image_url]
    );
    return { id: result.insertId, poll_id, question_text, type, image_url };
  },
  async findByPollId(poll_id) {
    const [rows] = await db.query("SELECT * FROM questions WHERE poll_id = ?", [
      poll_id,
    ]);
    return rows;
  },
  // ...other CRUD as needed
};

module.exports = Question;

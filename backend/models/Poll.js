// Poll model for MySQL
const db = require("../config/db");
const Question = require("./Question");
const Option = require("./Option");

const Poll = {
  // Example CRUD stubs
  async create(data) {
    try {
      // Insert poll and return new poll id
      const [result] = await db.query(
        "INSERT INTO polls (creator_id, question, image_url, type, expires_at, status) VALUES (?, ?, ?, ?, ?, ?)",
        [
          data.creator_id,
          data.question,
          data.image_url,
          data.type || "survey", // Default to 'survey' if not provided
          data.expires_at,
          "active",
        ]
      );
      return { id: result.insertId, ...data, type: data.type || "survey" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM polls WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findActive() {
    try {
      const [rows] = await db.query(
        'SELECT * FROM polls WHERE status = "active"'
      );
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async findAll() {
    try {
      const [rows] = await db.query("SELECT * FROM polls");
      return rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async update(id, data) {
    try {
      await db.query(
        "UPDATE polls SET question=?, image_url=?, type=?, expires_at=?, status=? WHERE id=?",
        [
          data.question,
          data.image_url,
          data.type,
          data.expires_at,
          data.status,
          id,
        ]
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async delete(id) {
    try {
      await db.query("DELETE FROM polls WHERE id=?", [id]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async createWithQuestions({
    creator_id,
    question,
    questions,
    image_url,
    expires_at,
  }) {
    const poll = await Poll.create({
      creator_id,
      question,
      image_url,
      expires_at,
    });
    for (const q of questions) {
      const questionRow = await Question.create({
        poll_id: poll.id,
        question_text: q.question_text,
        type: q.type,
        image_url: q.image_url || null,
      });
      for (const opt of q.options) {
        await Option.create({ question_id: questionRow.id, option_text: opt });
      }
    }
    return poll;
  },
  async findByIdWithQuestions(poll_id) {
    const poll = await Poll.findById(poll_id);
    const questions = await Question.findByPollId(poll_id);
    for (const q of questions) {
      q.options = await Option.findByQuestionId(q.id);
    }
    poll.questions = questions;
    return poll;
  },
  // ...other poll model methods
};

module.exports = Poll;

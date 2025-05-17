// Admin controller
const Poll = require("../models/Poll");
const Option = require("../models/Option");
const Vote = require("../models/Vote");
const User = require("../models/User");

const adminController = {
  async listAllPolls(req, res) {
    try {
      const polls = await Poll.findAll();
      // For each poll, get participants and department (mocked for now)
      const result = await Promise.all(
        polls.map(async (poll) => {
          const votes = await Vote.findByPollId(poll.id);
          return {
            ...poll,
            participants: new Set(votes.map((v) => v.user_id)).size,
            department: "Engineering", // mock
          };
        })
      );
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = adminController;

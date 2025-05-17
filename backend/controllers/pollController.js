// Poll controller
const Poll = require("../models/Poll");
const Option = require("../models/Option");
const Vote = require("../models/Vote");

const pollController = {
  async createPoll(req, res) {
    // Use mock user for now
    const userId = 1;
    const { questions, expires_at } = req.body;
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "Missing questions" });
    }
    try {
      // Use the first question's text and type as the poll's main question/type (for summary/listing)
      const pollQuestion = questions[0]?.question_text || "";
      const pollType = questions[0]?.type || "radio";
      const poll = await Poll.create({
        creator_id: userId,
        question: pollQuestion,
        image_url: null, // Optionally, use first question's image or null
        type: pollType, // Use the first question's type for the poll summary
        expires_at,
      });
      // Now create all questions and options
      for (const q of questions) {
        const questionRow = await require("../models/Question").create({
          poll_id: poll,
          question_text: q.question_text,
          type: q.type,
          image_url: q.image_url || null,
        });
        for (const opt of q.options) {
          await require("../models/Option").create({
            question_id: questionRow.id,
            option_text: opt,
          });
        }
      }
      res.status(201).json({ id: poll });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create poll" });
    }
  },
  async listActivePolls(req, res) {
    try {
      const polls = await Poll.findActive();
      res.json(polls);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch polls" });
    }
  },
  async getPollDetails(req, res) {
    try {
      // Fetch poll and all questions/options for this poll
      const poll = await Poll.findById(req.params.id);
      if (!poll) return res.status(404).json({ error: "Poll not found" });
      const questions = await require("../models/Question").findByPollId(
        poll.id
      );
      console.log("DEBUG poll:", poll);
      console.log("DEBUG questions:", questions);
      for (const q of questions) {
        q.options = await require("../models/Option").findByQuestionId(q.id);
        // For each option, count votes
        const votes = await Vote.findByPollId(poll.id);
        for (const opt of q.options) {
          opt.votes = votes.filter((v) => v.option_id === opt.id).length;
        }
        const totalVotes = q.options.reduce((sum, opt) => sum + opt.votes, 0);
        for (const opt of q.options) {
          opt.percent = totalVotes
            ? Math.round((opt.votes / totalVotes) * 100)
            : 0;
        }
      }
      res.json({ ...poll, questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch poll details" });
    }
  },
  async updatePoll(req, res) {
    try {
      await Poll.update(req.params.id, req.body);
      res.json({ message: "Poll updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update poll" });
    }
  },
  async deletePoll(req, res) {
    try {
      await Poll.delete(req.params.id);
      res.json({ message: "Poll deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete poll" });
    }
  },
  async voteOnPoll(req, res) {
    // Use mock user for now
    const userId = 1;
    const pollId = req.params.id;
    const { option_ids } = req.body; // option_ids is now an array of arrays (per question)
    try {
      const poll = await Poll.findById(pollId);
      if (!poll) return res.status(404).json({ error: "Poll not found" });
      const prevVotes = await Vote.findByUserIdAndPollId(userId, pollId);
      if (prevVotes.length > 0)
        return res.status(400).json({ error: "Already voted" });
      // Fetch all questions for this poll
      const questions = await require("../models/Question").findByPollId(
        pollId
      );
      for (let qIdx = 0; qIdx < questions.length; qIdx++) {
        const q = questions[qIdx];
        const selected = Array.isArray(option_ids[qIdx])
          ? option_ids[qIdx]
          : [option_ids[qIdx]];
        for (const oid of selected) {
          if (oid) {
            await Vote.create({
              user_id: userId,
              poll_id: pollId,
              question_id: q.id,
              option_id: oid,
            });
          }
        }
      }
      res.json({ message: "Vote submitted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to submit vote" });
    }
  },
};

module.exports = pollController;

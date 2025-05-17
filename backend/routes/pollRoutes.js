// Poll routes
const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");

// Define poll routes here
router.post("/", pollController.createPoll);
router.get("/", pollController.listActivePolls);
router.get("/:id", pollController.getPollDetails);
router.put("/:id", pollController.updatePoll);
router.delete("/:id", pollController.deletePoll);
router.post("/:id/vote", pollController.voteOnPoll);

module.exports = router;

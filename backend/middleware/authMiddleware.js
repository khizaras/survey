// Authentication middleware (SSO placeholder)
module.exports = (req, res, next) => {
  try {
    // TODO: Implement SSO authentication
    // Example: req.user = { id, name, email, department, sso_id }
    req["user"] = {
      id: 9,
      name: "Test User3",
      email: "test3_1747465361366_537@example.com",
      department: "QA",
      sso_id: "sso_test_3_1747465361366",
    };
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

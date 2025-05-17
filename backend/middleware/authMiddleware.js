// Authentication middleware (SSO placeholder)
module.exports = (req, res, next) => {
  try {
    // TODO: Implement SSO authentication
    // Example: req.user = { id, name, email, department, sso_id }
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

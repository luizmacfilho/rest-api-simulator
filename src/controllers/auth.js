const authService = require('../services/auth');

module.exports = {

  /**
   * Authenticate user using JWT
   * @param {Request} req
   * @param {Response} res
   */
  auth(req, res) {
    try {
      res.json(authService.authUserJWT(req.body.email, req.body.password));
    } catch (err) {
      res.status(err.error.status).json(err);
    }
  },
};

const jwt = require('jsonwebtoken');
const exception = require('../services/exception');
const secret = `it's secret`;
const data = {
  users: [{ email: "1", password: "1" }],
};

/**
 * Checks JWT is valid
 * @param {String} authorization Request bearer token
 */
function verifyJwt(authorization) {
  if (!authorization) {
    throw false;
  }
  jwt.verify(authorization.split(' ')[1], secret);
}

/**
 * Retrieves user token
 * @param {*} user Autheticated user
 */
function getToken(user) {
  return jwt.sign({ email: user.email, id: user.id }, secret);
}

module.exports = {

  /**
   * Checks user is authenticate
   * @param {Request} req Node request
   * @param {Response} res Node response
   * @param {Function} next Node next method
   * @returns {Promise.<Function>}
   */
  async isAutheticated(req, res, next) {
    try {
      verifyJwt(req.headers.authorization);
      return next();
    } catch (err) {
      throw err;
    }
  },
  /**
  * Checks if it's an authorized user
  * @param {String} email
  * @param {String} password
  * @returns {Boolean}
  */
  authUserJWT(email, password) {
    const authUser = data.users.filter((user) => user.email === email && user.password === password);
    if (authUser && authUser.length) {
      const user = authUser[0];
      return { ...user, token: getToken(user) };
    } else {
      exception.throwNotFound();
    }
  },
};

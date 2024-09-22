/**
 * @typedef {Object} LoginResult
 * @property {string} accessToken
 * @property {string} refreshToken
 * @property {Object} data
 * @property {boolean} data.isNewUser
*/

/**
 * @interface ILoginService
 */
class ILoginService {
  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<LoginResult>}
  */
  login (email, password) {}
}

module.exports = { ILoginService }
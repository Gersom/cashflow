const tokenService = require("./tokenService");

const tokenController = {
  async refresh(req, res) {
    const { refresh_token } = req.cookies;
    const {access_token} = await tokenService.refresh(refresh_token);
    this.setCookie(res, 'access_token', access_token);
    this.setCookie(res, 'refresh_token', refresh_token);
    res.status(200).json(user);
  },
  async verify(req, res) {
    const { access_token } = req.cookies;
    const user = await tokenService.verify(access_token);
    res.status(200).json(user);
  },
};

module.exports = tokenController;
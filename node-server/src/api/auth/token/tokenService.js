const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("@utils/apiErrors");
const { jwt: envJwt } = require("@config/env");

const tokenService = {

    refresh : async (refresh_token) => {
        try {
            const payload = jwt.verify(refresh_token, envJwt.refreshSecret);
            
            const access_token = jwt.sign(
                { id: payload.id }, 
                envJwt.secret,
                { expiresIn: envJwt.expiration },
                );
            
            return access_token;
        } catch (error) {
            console.error("JWT Verification Error:", error);
            throw new AuthorizationError("Invalid refresh token");
        }
    },
    verify : async (refresh_token) => {
        try {
            const payload = jwt.verify(refresh_token, envJwt.refreshSecret);
            return payload;
        } catch (error) {
            throw new AuthorizationError("Invalid access token");
        }
    }
};

module.exports = tokenService;
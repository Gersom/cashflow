const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("@utils/apiErrors");
const { jwt: envJwt } = require("@config/env");

const tokenService = {

    refresh : async (refresh_token) => {
        try {
            const payload = jwt.verify(refresh_token, envJwt.refreshSecret);
            console.log("verify", jwt.verify(refresh_token, envJwt.refreshSecret));
            
            console.log("payload",payload);
            console.log("refresh_token",refresh_token);
            
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
    verify : async (access_token) => {
        try {
            const payload = jwt.verify(access_token, envJwt.secret);
            return payload;
        } catch (error) {
            throw new AuthorizationError("Invalid access token");
        }
    }
};

module.exports = tokenService;
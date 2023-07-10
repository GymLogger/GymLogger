"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
const createAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ userId: user.id }, "asdfefe", {
        expiresIn: "10y",
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ userId: user.id }, "iwueyiwuye", {
        expiresIn: "10y",
    });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=auth.js.map
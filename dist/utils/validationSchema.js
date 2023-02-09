"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidation = exports.logInValidation = exports.singUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const singUpValidation = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().label("Email"),
        password: joi_1.default.string().required().label("Password")
    });
    return schema.validate(user);
};
exports.singUpValidation = singUpValidation;
const logInValidation = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required().label("Email"),
        password: joi_1.default.string().required().label("Password")
    });
    return schema.validate(user);
};
exports.logInValidation = logInValidation;
const refreshTokenValidation = (body) => {
    const schema = joi_1.default.object({
        refreshToken: joi_1.default.string().required().label("Refresh token"),
    });
    return schema.validate(body);
};
exports.refreshTokenValidation = refreshTokenValidation;

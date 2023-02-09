"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationSchema_1 = require("../utils/validationSchema");
const token_1 = require("../helper/token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (app) => {
    app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { refreshToken } = req.body;
        const error = (0, validationSchema_1.refreshTokenValidation)({ refreshToken });
        if (error) {
            return res.status(400).json({
                error: true,
                message: 'Invalid refresh token',
            });
        }
        (0, token_1.verifyToken)(refreshToken)
            .then((data) => {
            const payload = {
                id: data.tokenDetails.id,
                email: data.tokenDetails.email,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: '14m',
            });
            res.status(200).json({
                token,
            });
        })
            .catch((err) => {
            res.status(400).json(err);
        });
    }));
};

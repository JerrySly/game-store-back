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
exports.verifyToken = exports.generateToken = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = { id: user.id, email: user.email };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '10m',
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: '30d',
    });
    const tokensTable = yield (0, database_1.getTable)('Tokens');
    if (!user.id) {
        throw new Error('User not created');
    }
    const userToken = tokensTable.rows.find((x) => x.userId === user.id);
    if (userToken) {
        yield (0, database_1.deleteValue)('Tokens', user.id, 'userId');
    }
    yield (0, database_1.addValuesToTable)('Tokens', [
        {
            token: refreshToken,
            userId: user.id,
        },
    ]);
    return {
        accessToken,
        refreshToken,
    };
});
exports.generateToken = generateToken;
const verifyToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        (0, database_1.getTable)('Tokens').then((data) => {
            const tokenTable = data;
            const token = tokenTable.rows.find((x) => x.token === refreshToken);
            if (!token) {
                return reject('Invalid token');
            }
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, tokenDetails) => {
                if (err)
                    return reject('Invalid token');
                return resolve({
                    tokenDetails,
                    message: 'Valid token',
                });
            });
        });
    });
};
exports.verifyToken = verifyToken;

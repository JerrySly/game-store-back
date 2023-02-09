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
exports.comparePassword = exports.hashingPassword = void 0;
const bcrypt_1 = require("bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashingPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = process.env.SALT_ROUNDS;
    if (!rounds) {
        throw new Error("Hash not amount of salt rounds");
    }
    const salt = yield (0, bcrypt_1.genSalt)(Number.parseInt(rounds));
    return yield (0, bcrypt_1.hash)(password, salt);
});
exports.hashingPassword = hashingPassword;
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcrypt_1.compare)(password, hash);
});
exports.comparePassword = comparePassword;

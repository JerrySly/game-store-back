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
Object.defineProperty(exports, "__esModule", { value: true });
exports.singUp = exports.logIn = void 0;
const hashing_1 = require("../helper/hashing");
const user_1 = require("../database/entities/user");
const database_1 = require("../database");
const userRepo = database_1.dataSource.getRepository(user_1.User);
const logIn = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const tableUser = yield getUserByEmail(user.email);
    if (!tableUser) {
        return {
            error: true,
            message: 'User is not exist',
            data: null,
        };
    }
    const isPasswordEqual = yield (0, hashing_1.comparePassword)(user.password, tableUser.password);
    if (isPasswordEqual) {
        return {
            error: false,
            message: 'Valid data',
            data: tableUser,
        };
    }
    return {
        data: null,
        error: true,
        message: 'Password is invalid',
    };
});
exports.logIn = logIn;
const singUp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const tableUser = yield getUserByEmail(user.email);
    if (tableUser) {
        return {
            error: true,
            data: null,
            message: 'User is exist',
        };
    }
    const hashed = yield (0, hashing_1.hashingPassword)(user.password);
    const createdUser = yield userRepo.create({
        email: user.email,
        password: hashed,
    });
    userRepo.save(createdUser);
    const newTableUser = yield getUserByEmail(user.email);
    if (!newTableUser) {
        return {
            error: true,
            message: 'Error on create user',
            data: null,
        };
    }
    return {
        error: false,
        message: 'Ok',
        data: newTableUser,
    };
});
exports.singUp = singUp;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userRepo.findOne({
        where: {
            email,
        },
    });
});

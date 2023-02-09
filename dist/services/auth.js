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
const database_1 = require("../database");
const hashing_1 = require("../helper/hashing");
const logIn = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield (0, database_1.getTable)('Users');
    const tableUser = table.rows.find((x) => x.email === user.email);
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
    let table = yield (0, database_1.getTable)('Users');
    console.log(table);
    const tableUser = table.rows.find((x) => x.email === user.email);
    if (tableUser) {
        return {
            error: true,
            data: null,
            message: 'User is exist',
        };
    }
    const hashed = yield (0, hashing_1.hashingPassword)(user.password);
    yield (0, database_1.addValuesToTable)('Users', [
        //TODO посмотри что такое TypeORM и возможно его лучше тут использовать
        {
            email: `'${user.email}'`,
            password: `'${hashed}'`,
        },
    ]);
    table = yield (0, database_1.getTable)('Users');
    const newTableUser = table.rows.find((x) => x.email === user.email);
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

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
exports.singUp = exports.singIn = void 0;
const database_1 = require("../database");
const hashing_1 = require("../helper/hashing");
const singIn = (login, password) => __awaiter(void 0, void 0, void 0, function* () {
    const table = yield (0, database_1.getTable)("Users");
    const user = table.find((x) => x.login === login);
    if (!user) {
        throw new Error("User is not exist");
    }
    const isPasswordEqual = yield (0, hashing_1.comparePassword)(password, user.password);
    if (isPasswordEqual) {
        return user;
    }
    throw new Error("Password incorrect");
});
exports.singIn = singIn;
const singUp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user.password = yield (0, hashing_1.hashingPassword)(user.password);
        const userArray = [user];
        yield (0, database_1.addValuesToTable)("Users", userArray);
        return true;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error on singUp \n" + error.message);
        }
        else
            console.log("Error on singUp " + error);
        return false;
    }
});
exports.singUp = singUp;

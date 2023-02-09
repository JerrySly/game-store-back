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
const auth_1 = require("../services/auth");
const validationSchema_1 = require("../utils/validationSchema");
const token_1 = require("../helper/token");
exports.default = (app) => {
    app.post('/singUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            console.log('req', user);
            const { error } = (0, validationSchema_1.singUpValidation)(user);
            console.log(error);
            if (error) {
                return res.status(400).json({
                    error: true,
                    message: 'Invalid user data',
                });
            }
            const response = yield (0, auth_1.singUp)(user);
            if (response.error) {
                return res.status(401).json(response);
            }
            res.status(200).json({
                error: false,
                data: null,
                message: 'Ok',
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
        }
    }));
    app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            const { error } = (0, validationSchema_1.logInValidation)(user);
            if (error) {
                return res.status(400).json({
                    error: true,
                    message: 'Invalid user data',
                });
            }
            const response = yield (0, auth_1.logIn)(user);
            if (response.error) {
                return res.status(401).json(response);
            }
            const tokens = (0, token_1.generateToken)(response.data);
            res.status(200).json({
                error: false,
                data: tokens,
                message: 'Ok',
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                error: true,
                message: 'Internal Server Error',
            });
        }
    }));
};

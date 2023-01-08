"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../services/auth");
exports.default = (app) => {
    app.post('/singIn', (req, res) => {
        const { login, password } = req.body;
        (0, auth_1.singIn)(login, password);
    });
};

import {Express} from "express"
import { singIn } from "../services/auth";
export default (app:Express) => {
    app.post('/singIn', (req,res) => {
        const {login,password} = req.body;
        singIn(login,password)
    })
}
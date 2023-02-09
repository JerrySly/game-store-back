import Joi from "joi"
import { User } from "../types/user"

const singUpValidation = (user:User) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(user);
}

const logInValidation = (user:User) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(user);
}

const refreshTokenValidation = (body: {
    refreshToken: string
}) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh token"),
    })
    return schema.validate(body);
}

export {
    singUpValidation,
    logInValidation,
    refreshTokenValidation
}
import bcrypt from 'bcrypt';
import settings from '../settings.json'
export const hashingPassword = (password) => {
    const salt = bcrypt.genSalt(settings.saltRounds);
    return bcrypt.hash(password,salt);
}

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}
import database from '../database';
import hashing from '../helper/hashing';
export const singIn = (login, password) => {
    
}

export const getUsers = () => {
    return database.getTable('Users')
}
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
exports.deleteValue = exports.addValuesToTable = exports.getTable = void 0;
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    database: 'Gamestore',
    password: 'postgres',
    hostname: 'port',
    port: 5432,
});
client.connect();
const getTable = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client.query(`select * from "${tableName}"`);
});
exports.getTable = getTable;
const addValuesToTable = (tableName, values) => __awaiter(void 0, void 0, void 0, function* () {
    let listProps = Object.keys(values[0]);
    console.log('List', listProps);
    let query = `INSERT INTO "${tableName}" (${listProps.join(',')}) VALUES `;
    for (let value of values) {
        query += `(${Object.values(value).join(',')});`;
    }
    // query = query.substring(0, query.length-1)
    console.log(query);
    try {
        yield client.query(query);
    }
    catch (ex) {
        console.log(ex);
    }
});
exports.addValuesToTable = addValuesToTable;
const deleteValue = (tableName, primaryKey, primaryKeyName) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.query(`Delete * from ${tableName} Where ${primaryKeyName} = ${primaryKey}`);
});
exports.deleteValue = deleteValue;

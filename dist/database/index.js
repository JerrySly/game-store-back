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
exports.createDefaultTables = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const promises_1 = require("fs/promises");
const user_1 = require("./entities/user");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'GameStore',
    entities: [user_1.User],
});
exports.dataSource = dataSource;
dataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
const useSQLScript = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const createScript = yield (0, promises_1.open)(filePath);
    try {
        const content = yield createScript.readFile();
        yield dataSource.createQueryRunner().manager.query(content.toString('ascii'));
    }
    catch (e) {
        console.log(e);
    }
    finally {
        createScript.close();
    }
});
const createDefaultTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield useSQLScript('./database/createTables.sql');
});
exports.createDefaultTables = createDefaultTables;

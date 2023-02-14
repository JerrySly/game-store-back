"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRepo = void 0;
const typeorm_1 = require("typeorm");
class GameRepo extends typeorm_1.Repository {
    addGame(game) {
        return this.create(game);
    }
    getById(id) {
        return this.findBy({
            id,
        });
    }
    updateFieldById(id, props) {
        return this.save(Object.assign({ id }, props));
    }
}
exports.GameRepo = GameRepo;

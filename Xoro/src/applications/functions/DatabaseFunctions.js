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
exports.deleteUsingId = exports.findData = exports.checkObjectId = exports.updateById = exports.insertData = exports.findUsingId = exports.findOneData = void 0;
const mongoose_1 = require("mongoose");
const findOneData = (Db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findOne(query);
});
exports.findOneData = findOneData;
const findUsingId = (Db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findById(query);
});
exports.findUsingId = findUsingId;
const insertData = (Db, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.insertMany([data]);
});
exports.insertData = insertData;
const updateById = (Db, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, { $set: data });
});
exports.updateById = updateById;
const checkObjectId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mongoose_1.isObjectIdOrHexString)(id);
});
exports.checkObjectId = checkObjectId;
const findData = (Db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.find(query);
});
exports.findData = findData;
const deleteUsingId = (Db, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndDelete(id);
});
exports.deleteUsingId = deleteUsingId;

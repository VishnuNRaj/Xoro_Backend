"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDataRes = void 0;
const searchDataRes = (data) => {
    return {
        data: data.data,
        message: data.message,
        status: data.status,
    };
};
exports.searchDataRes = searchDataRes;

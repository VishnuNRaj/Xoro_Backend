"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoRes = void 0;
const uploadVideoRes = (data) => {
    return {
        message: data.message,
        status: data.status,
    };
};
exports.uploadVideoRes = uploadVideoRes;

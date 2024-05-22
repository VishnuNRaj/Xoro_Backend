"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchData = void 0;
const searchData = (req, res) => {
    try {
        const result = req === null || req === void 0 ? void 0 : req.result;
        if (result) {
            // const data = 
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.searchData = searchData;

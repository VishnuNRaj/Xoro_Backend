"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const websocket_1 = __importDefault(require("./websocket"));
function server(config) {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
    (0, websocket_1.default)(httpServer);
    return { app, httpServer };
}
exports.default = server;

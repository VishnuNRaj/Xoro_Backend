"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketInstance = exports.initializeSocketServer = void 0;
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("../../config/config"));
const Sockets_1 = __importDefault(require("../../controllers/Socket/Sockets"));
let io;
const initializeSocketServer = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: config_1.default.BASE,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    (0, Sockets_1.default)(io);
};
exports.initializeSocketServer = initializeSocketServer;
const getSocketInstance = () => io;
exports.getSocketInstance = getSocketInstance;

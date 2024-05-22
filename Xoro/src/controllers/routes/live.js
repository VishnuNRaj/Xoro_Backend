"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const liveRouter = (0, express_1.Router)();
// import webSocket from '../../frameworks/server/websocket';
liveRouter.get('/start-live', (req, res) => {
    // webSocket()
    res.status(200).json({ message: 'Socket Started Successfully' });
});
exports.default = liveRouter;

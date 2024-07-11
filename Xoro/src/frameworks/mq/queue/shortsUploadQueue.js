"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ShortsQueue = new bullmq_1.Queue("Shorts Upload");
exports.default = ShortsQueue;

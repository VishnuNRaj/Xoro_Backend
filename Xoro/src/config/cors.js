"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const origin = [];
for (let i = 1; i <= 5; i++) {
    const data = process.env["API_" + i];
    if (!data)
        break;
    if (data)
        origin.push(data);
}
const CorsConfig = {
    preflightContinue: true,
    origin: origin,
    credentials: true
};
exports.default = CorsConfig;

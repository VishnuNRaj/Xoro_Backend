"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChannelSchema = new mongoose_1.Schema({
    Name: String,
    UserId: String,
    Type: [String],
    Subsribers: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
    },
    Reports: {
        type: Number,
        default: 0
    },
    Description: String,
    Logo: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojclzzRsQKY9EiIzhdDfH1Bb4M2KRFXWKXQ&s'
    },
});
const ChannelModel = (0, mongoose_1.model)('channels', ChannelSchema);
exports.default = ChannelModel;

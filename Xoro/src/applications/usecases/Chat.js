"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Repository = __importStar(require("../repository/Chat/UserChatRepository"));
const UserFunctions = __importStar(require("../functions/UserFunctions"));
const firebase_1 = require("../../config/firebase");
const CommonFunctions_1 = require("../functions/CommonFunctions");
class Usecases {
    getChats(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user }) {
            try {
                return yield Repository.getChats(user);
            }
            catch (e) {
                return {
                    user: user,
                    message: 'Internal Server Error',
                    status: 500,
                    allChats: [],
                };
            }
        });
    }
    SendMessage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ Files, Message, RoomId, user }) {
            try {
                if (!RoomId || RoomId.length < 32 || Files.length < 1) {
                    return {
                        message: 'Invalid Credentials',
                        status: 201,
                    };
                }
                const file = yield Promise.all(Files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    return {
                        FileType: file.mimetype,
                        FileLink: yield (0, firebase_1.uploadFileToFirebase)(file, `chats/${RoomId}/`)
                    };
                })));
                return yield Repository.SendMessage({ user, Message, Data: file, RoomId });
            }
            catch (e) {
                return {
                    message: 'Internal Server Error',
                    status: 500
                };
            }
        });
    }
    StartChat(_a) {
        return __awaiter(this, arguments, void 0, function* ({ UserId, user, GroupName, Profile }) {
            try {
                let error = null;
                if (GroupName && GroupName.length < 2) {
                    error = "Enter Groupname";
                }
                if (UserId.length < 1) {
                    error = 'No User Found';
                }
                UserId.push(user._id);
                const filtered = UserId.filter((id, idx, users) => users.indexOf(id) === idx);
                if (filtered.length < 1) {
                    error = "No Users Selected";
                }
                if (error) {
                    return {
                        message: "Internal Server Error",
                        status: 201
                    };
                }
                const data = UserId.map((id) => {
                    return {
                        UserId: id,
                        Time: new Date(),
                    };
                });
                return yield Repository.StartChat({
                    LastClear: data,
                    Users: UserId.map((val) => {
                        return {
                            UserId: val,
                            Admin: val === user._id
                        };
                    }),
                    GroupName: GroupName,
                    Profile: Profile && UserId.length > 1 ? yield UserFunctions.uploadBase64Image(Profile) : GroupName ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTyd8_auP0lwN9U9wckV20lHguT89du3tbw&s" : undefined,
                    RoomId: (0, CommonFunctions_1.generateVerificationLink)()
                });
            }
            catch (e) {
                return {
                    message: "Internal Server Error",
                    status: 500,
                };
            }
        });
    }
    getChat(_a) {
        return __awaiter(this, arguments, void 0, function* ({ RoomId, user }) {
            try {
                if (!RoomId || RoomId.length < 32) {
                    return {
                        message: "Invalid Credentials",
                        status: 201
                    };
                }
                return yield Repository.getChat(RoomId, user);
            }
            catch (e) {
                console.log(e);
                return {
                    message: "Internal Server Error",
                    status: 500
                };
            }
        });
    }
}
exports.default = Usecases;

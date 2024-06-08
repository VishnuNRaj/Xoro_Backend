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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementRepository = exports.UserDataRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/AdminResponse"));
const User_1 = __importDefault(require("../../../frameworks/database/models/User"));
const Admin_1 = __importDefault(require("../../../frameworks/database/models/Admin"));
const UnverifiedUsers_1 = __importDefault(require("../../../frameworks/database/models/UnverifiedUsers"));
const UserDataRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield DatabaseFunctions.findData(UnverifiedUsers_1.default, {});
        return ResponseFunctions.AdminUserDataRes({
            message: 'All Available Users',
            status: 200,
            users: users
        });
    }
    catch (e) {
        return ResponseFunctions.AdminUserDataRes({
            message: 'Internal Server Error',
            status: 500,
            users: null
        });
    }
});
exports.UserDataRepository = UserDataRepository;
const UserManagementRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ UserId, Suspended, SuspendedTill, Terminate, Admin }) {
    try {
        const user = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, UserId);
        console.log('______________________________________');
        console.log(user);
        if (!user) {
            return ResponseFunctions.AdminUserManagementRes({
                message: 'Invalid Link',
                status: 203
            });
        }
        user.Suspended = Suspended;
        if (Suspended && SuspendedTill) {
            const date = new Date();
            date.setDate(date.getDate() + parseInt(SuspendedTill.toString()));
            user.SuspendedTill = date;
        }
        else {
            user.SuspendedTill = undefined;
        }
        user.Terminated = Terminate;
        if (!Admin) {
            yield DatabaseFunctions.deleteUsingId(Admin_1.default, user._id);
        }
        else if (Admin && !user.Suspended && !user.Terminated && !Suspended && !Terminate) {
            yield DatabaseFunctions.insertData(Admin_1.default, Object.assign(Object.assign({}, user), { User: true }));
        }
        else {
            return ResponseFunctions.AdminUserManagementRes({
                message: 'Account Suspended or Terminated',
                status: 203
            });
        }
        yield user.save();
        yield DatabaseFunctions.updateById(User_1.default, UserId, { Suspended: user.Suspended, SuspendedTill: user.SuspendedTill, Terminated: user.Terminated });
        return ResponseFunctions.AdminUserManagementRes({
            message: 'Account Actions Successfull',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.AdminUserManagementRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.UserManagementRepository = UserManagementRepository;

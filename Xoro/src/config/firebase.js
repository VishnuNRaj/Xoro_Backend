"use strict";
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
exports.uploadFileToFirebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const storage_json_1 = __importDefault(require("../../Firebase/storage.json"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const firebaseSetup = {
    credential: firebase_admin_1.default.credential.cert(storage_json_1.default),
    storageBucket: process.env.FIRESTORE_BUCKET || 'xorostreams.appspot.com',
};
firebase_admin_1.default.initializeApp(firebaseSetup);
function uploadFileToFirebase(file, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const bucket = firebase_admin_1.default.storage().bucket();
        try {
            const MAX_EXPIRY_DATE = new Date('9999-12-31T23:59:59Z');
            const buffer = (0, fs_1.readFileSync)(file.path);
            yield bucket.file(path).save(buffer, {
                metadata: {
                    contentType: file.mimetype,
                },
                gzip: true,
            });
            const data = bucket.file(path);
            const signedUrl = yield data.getSignedUrl({
                action: 'read',
                expires: MAX_EXPIRY_DATE,
            });
            console.log('File uploaded successfully');
            return signedUrl[0];
        }
        catch (error) {
            console.error('Error uploading file to Firebase Storage:', error);
            throw error;
        }
    });
}
exports.uploadFileToFirebase = uploadFileToFirebase;
exports.default = firebase_admin_1.default;

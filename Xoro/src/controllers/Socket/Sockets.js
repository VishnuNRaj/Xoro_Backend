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
const SocketFunctions = __importStar(require("./SocketFunctions"));
const s3bucket_1 = __importDefault(require("../../config/s3bucket"));
const stream_1 = require("stream");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let live = {};
const socketRoutes = (io) => {
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }
    io.on('connection', (socket) => {
        socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
        socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
        socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
        socket.on('disconnect', () => SocketFunctions.disconnect(socket));
        socket.on('start', (UserId) => __awaiter(void 0, void 0, void 0, function* () {
            if (!live[UserId]) {
                live[UserId] = {
                    cameraStream: new stream_1.PassThrough(),
                    screenStream: new stream_1.PassThrough()
                };
                const cameraKey = `camera/${UserId}-${Date.now()}.webm`;
                const screenKey = `screen/${UserId}-${Date.now()}.webm`;
                // Create S3 upload streams for camera and screen
                const uploadCameraParams = {
                    Bucket: 'xoro-',
                    Key: cameraKey,
                    Body: live[UserId].cameraStream
                };
                const uploadScreenParams = {
                    Bucket: 'your-bucket-name',
                    Key: screenKey,
                    Body: live[UserId].screenStream
                };
                // Start upload for camera stream
                const cameraUpload = s3bucket_1.default.send(new client_s3_1.PutObjectCommand(uploadCameraParams));
                cameraUpload.then((data) => {
                    console.log('Successfully uploaded camera stream:', data);
                }).catch((err) => {
                    console.error('Error uploading camera stream:', err);
                });
                // Start upload for screen stream
                const screenUpload = s3bucket_1.default.send(new client_s3_1.PutObjectCommand(uploadScreenParams));
                screenUpload.then((data) => {
                    console.log('Successfully uploaded screen stream:', data);
                }).catch((err) => {
                    console.error('Error uploading screen stream:', err);
                });
                // Generate presigned URLs for live access
                const cameraUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3bucket_1.default, new client_s3_1.PutObjectCommand(uploadCameraParams));
                const screenUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3bucket_1.default, new client_s3_1.PutObjectCommand(uploadScreenParams));
                // Emit the presigned URLs back to the client
                socket.emit('liveLinks', { cameraUrl, screenUrl });
            }
        }));
        socket.on('camera', (data) => {
            if (live[socket.id]) {
                live[socket.id].cameraStream.write(Buffer.from(data));
            }
        });
        socket.on('screen', (data) => {
            if (live[socket.id]) {
                live[socket.id].screenStream.write(Buffer.from(data));
            }
        });
        socket.on('stop', (UserId) => {
            if (live[UserId]) {
                live[UserId].cameraStream.end();
                live[UserId].screenStream.end();
                delete live[UserId];
            }
        });
    });
    return io;
};
exports.default = socketRoutes;

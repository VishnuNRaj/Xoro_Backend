import { Server as SocketIOServer, Socket } from 'socket.io';
import * as SocketFunctions from './SocketFunctions';
import s3 from '../../config/s3bucket'
import { PassThrough } from 'stream';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
let live:any = {}
const socketRoutes = (io: SocketIOServer): SocketIOServer => {
    if (!io) {
        throw new Error('Socket instance is undefined. Ensure initializeSocketServer is called.');
    }

    io.on('connection', (socket) => {
        socket.on('join', (UserId) => SocketFunctions.joinUserId(socket, UserId));
        socket.on('notification', ({ data, UserId }) => SocketFunctions.sendNotifications(socket, data, UserId));
        socket.on('chat', ({ data, UserId }) => SocketFunctions.chatRoom(socket, UserId, data));
        socket.on('disconnect', () => SocketFunctions.disconnect(socket));

        socket.on('start', async (UserId) => {
            if (!live[UserId]) {
                live[UserId] = {
                    cameraStream: new PassThrough(),
                    screenStream: new PassThrough()
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
                const cameraUpload = s3.send(new PutObjectCommand(uploadCameraParams));
                cameraUpload.then((data) => {
                    console.log('Successfully uploaded camera stream:', data);
                }).catch((err) => {
                    console.error('Error uploading camera stream:', err);
                });

                // Start upload for screen stream
                const screenUpload = s3.send(new PutObjectCommand(uploadScreenParams));
                screenUpload.then((data) => {
                    console.log('Successfully uploaded screen stream:', data);
                }).catch((err) => {
                    console.error('Error uploading screen stream:', err);
                });

                // Generate presigned URLs for live access
                const cameraUrl = await getSignedUrl(s3, new PutObjectCommand(uploadCameraParams));
                const screenUrl = await getSignedUrl(s3, new PutObjectCommand(uploadScreenParams));

                // Emit the presigned URLs back to the client
                socket.emit('liveLinks', { cameraUrl, screenUrl });
            }
        });

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
export default socketRoutes;

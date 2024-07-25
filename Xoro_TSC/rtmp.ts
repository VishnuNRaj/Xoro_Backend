import express from 'express';
import http from 'http';
import { spawn } from 'child_process';
import NodeMediaServer from 'node-media-server';
import path from 'path';

const app = express();
const server = http.createServer(app);

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
    },
    http: {
        port: 6067,
        allow_origin: '*',
        mediaroot: path.join(__dirname, 'Live'),
        api: true,
    },
    trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                vc: 'libx264',
                ac: 'aac',
                rtmp: true,
                hls: true,
                hlsFlags: '[hls_time=2]',
                dash: false,
                dvr: true,
                fission: true,
                hlsKeep: true,
                outputs: [
                    { ab: '64k', vb: '500k', vs: '640x360', vf: '15' },
                    { ab: '128k', vb: '1000k', vs: '854x480', vf: '24' },
                    { ab: '128k', vb: '1500k', vs: '1280x720', vf: '30' },
                    { ab: '256k', vb: '3000k', vs: '1920x1080', vf: '30' },
                ],
            },
            {
                app: 'shorts',
                vc: 'libx264',
                ac: 'aac',
                rtmp: true,
                hls: true,
                hlsFlags: '[hls_time=2]',
                dash: false,
                dvr: true,
                fission: true,
                hlsKeep: true,
                outputs: [
                    { ab: '64k', vb: '500k', vs: '640x360', vf: '15' },
                    { ab: '128k', vb: '1000k', vs: '854x480', vf: '24' },
                    { ab: '128k', vb: '1500k', vs: '1280x720', vf: '30' },
                    { ab: '256k', vb: '3000k', vs: '1920x1080', vf: '30' },
                ],
            },
        ],
        mediaRoot: path.join(__dirname, 'Live')
    },
    dvr: [
        
        {
            app: 'live',
            root: path.join(__dirname, 'Live'),
            saveType: 'mp4',
            saveMode: 'segment',
        },
        {
            app: 'shorts',
            root: path.join(__dirname, 'Shorts'),
            saveType: 'mp4',
            saveMode: 'segment',
        },
    ]
};

const nms = new NodeMediaServer(config);

nms.on('postPublish', (id, StreamPath, args) => {
    console.log(`[NodeEvent on postPublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
    console.log(`[NodeEvent on donePublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.run();

console.log('NodeMediaServer is running');

const startFFmpegProcess = (videoPath: string, streamingUrl: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const ffmpegCommand = 'ffmpeg';
        const args = [
            '-re',
            '-analyzeduration', '100M',
            '-probesize', '100M',
            '-i', videoPath,
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-maxrate', '3000k',
            '-bufsize', '6000k',
            '-vf', 'scale=-2:720',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-f', 'flv',
            streamingUrl
        ];

        const ffmpegProcess = spawn(ffmpegCommand, args);

        ffmpegProcess.stdout.on('data', (data) => {
            console.log(`FFmpeg stdout: ${data}`);
        });

        ffmpegProcess.stderr.on('data', (data) => {
            console.error(`FFmpeg stderr: ${data}`);
        });

        ffmpegProcess.on('close', (code) => {
            console.log(`FFmpeg process exited with code ${code}`);
            if (code === 0) {
                resolve(true);
            } else {
                reject(new Error(`FFmpeg process exited with code ${code}`));
            }
        });

        ffmpegProcess.on('error', (err) => {
            console.error(`FFmpeg process error: ${err}`);
            reject(err);
        });
    });
};

app.post('/stream-mp4', async (req, res) => {
    const { videoPath, streamKey } = req.body;
    const streamingUrl = `rtmp://localhost/live/${streamKey}`;

    try {
        await startFFmpegProcess(videoPath, streamingUrl);
        res.status(200).send('Streaming started');
    } catch (err:any) {
        res.status(500).send(`Failed to start streaming: ${err.message}`);
    }
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

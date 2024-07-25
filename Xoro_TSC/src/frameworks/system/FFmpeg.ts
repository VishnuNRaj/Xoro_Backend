// import { spawn } from "child_process";

// const startFFmpegProcess = (videoPath: string, streamingUrl: string, videoId: string, _save: boolean): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const ffmpegCommand = 'ffmpeg';
//         const args = [
//             '-re', '-i', videoPath,
//             '-acodec', 'libmp3lame', '-ar', '44100', '-b:a', '128k',
//             '-pix_fmt', 'yuv420p', '-profile:v', 'baseline', '-s', '426x240',
//             '-bufsize', '6000k', '-vb', '400k', '-maxrate', '1500k',
//             '-vcodec', 'libx264', '-preset', 'veryfast', '-g', '30', '-r', '30', '-f', 'flv',
//             '-flvflags', 'no_duration_filesize',
//             streamingUrl
//         ];

//         const ffmpegProcess = spawn(ffmpegCommand, args);

//         ffmpegProcess.stdout.on('data', (data) => {
//             console.log(`FFmpeg stdout: ${data}`);
//         });

//         ffmpegProcess.stderr.on('data', (data) => {
//             console.error(`FFmpeg stderr: ${data}`);
//         });

//         ffmpegProcess.on('close', (code) => {
//             console.log(`FFmpeg process exited with code ${code}`);
//             if (code === 0) {
//                 resolve(`http://localhost:6067/videos/${videoId}`);
//             } else {
//                 reject(new Error(`FFmpeg process exited with code ${code}`));
//             }
//         });

//         ffmpegProcess.on('error', (err) => {
//             console.error(`FFmpeg process error: ${err}`);
//             reject(err);
//         });
//     });
// };

// export default startFFmpegProcess;

import { spawn } from "child_process";

const startFFmpegProcess = (videoPath: string, streamingUrl: string, videoId: string, _save: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
        const ffmpegCommand = 'ffmpeg';
        const args = [
            '-re', '-i', videoPath,
            '-c', 'copy',  // Copy both audio and video streams without re-encoding
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
                resolve(`http://localhost:6067/videos/${videoId}`);
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

export default startFFmpegProcess;


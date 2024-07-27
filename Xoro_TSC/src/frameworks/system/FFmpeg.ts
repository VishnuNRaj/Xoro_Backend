import { spawn } from "child_process";

const startFFmpegProcess = (videoPath: string, streamingUrl: string, videoId: string, _save: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
        const ffmpegCommand = 'ffmpeg';
        const args = [
            '-re', '-i', videoPath,
            '-c', 'copy',
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


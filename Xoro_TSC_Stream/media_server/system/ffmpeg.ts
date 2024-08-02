import { spawn, ChildProcess } from 'child_process';
import ConfigFile from '../../config';

const initFFmpegProcess = (streamKey: string): ChildProcess => {
    const ffmpegProcess = spawn('ffmpeg', [
        '-i', 'pipe:0',
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-f', 'flv',
        `${ConfigFile.RTMP_URL}/live/${streamKey}`
    ]);

    ffmpegProcess.on('error', (err) => {
        console.error('FFmpeg Error:', err.message);
    });

    ffmpegProcess.on('close', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);
    });

    ffmpegProcess.on('exit', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);
    });

    return ffmpegProcess;
};

export { initFFmpegProcess };

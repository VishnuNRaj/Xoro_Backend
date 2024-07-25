import express, { Response } from 'express';
import path from 'path';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json());

const maxConcurrentProcesses = 5;
let runningProcesses = 0;
const processQueue: (() => void)[] = [];

const startFFmpegProcess = (videoPath: string, streamingUrl: string, res: Response) => {
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
    runningProcesses--;
    if (processQueue.length > 0) {
      const nextTask = processQueue.shift();
      if (nextTask) nextTask();
    }
  });

  runningProcesses++;
  res.json({ streamingUrl });
};

app.get('/abc', (_req, res) => {
  const videoFile = 'file_1720980310767.mp4';
  const streamingUrl = `rtmp://localhost/live/${videoFile}`;
  const videoPath = path.join(__dirname, 'Public', videoFile);

  if (runningProcesses < maxConcurrentProcesses) {
    startFFmpegProcess(videoPath, streamingUrl, res);
  } else {
    processQueue.push(() => startFFmpegProcess(videoPath, streamingUrl, res));
  }
});

app.listen(6707, () => {
  console.log('Server is running on port 6707');
});

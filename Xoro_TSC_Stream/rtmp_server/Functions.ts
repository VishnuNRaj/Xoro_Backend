import ffmpeg from "fluent-ffmpeg"
export const saveLiveStream = (inputPath: string, outputPath: string): void => {
    ffmpeg(inputPath)
      .outputOptions('-c copy')
      .on('start', (commandLine) => {
        console.log(`Spawned FFmpeg with command: ${commandLine}`);
      })
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent}% done`);
      })
      .on('end', () => {
        console.log(`File has been converted successfully: ${outputPath}`);
      })
      .on('error', (err, stdout, stderr) => {
        console.log(`Error: ${err.message}`);
        console.log(`ffmpeg stdout: ${stdout}`);
        console.log(`ffmpeg stderr: ${stderr}`);
      })
      .save(outputPath);
  };
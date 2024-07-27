import { RequestHandler } from "express";
import path from "path";
import fs from "fs";
import busboy from "busboy";
import { exec } from "child_process";

const uploadsDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const TrimVideo: RequestHandler = (req, res) => {
    const bb = busboy({ headers: req.headers });

    let fileData = "";
    let startTime = 0;
    let endTime = 0;

    bb.on('file', (_name, file, info) => {
        const saveTo = path.join(uploadsDir, info.filename);
        file.pipe(fs.createWriteStream(saveTo));
        fileData = saveTo;
    });

    bb.on('field', (name, value) => {
        if (name === 'start') {
            startTime = parseFloat(value);
        } else if (name === 'end') {
            endTime = parseFloat(value);
        }
    });

    bb.on('close', () => {
        if (fileData && startTime !== null && endTime !== null) {
            const outputFile = path.join(uploadsDir, `trimmed-${Date.now()}.mp4`);
            const ffmpegCommand = `ffmpeg -i "${fileData}" -ss ${startTime} -to ${endTime} -c copy "${outputFile}"`;

            exec(ffmpegCommand, (error, _stdout, _stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    res.status(500).send('Error processing the file');
                    return;
                }

                res.setHeader('Content-Type', 'video/mp4');
                const stream = fs.createReadStream(outputFile);
                stream.pipe(res);
                
                stream.on('end', () => {
                    fs.unlinkSync(fileData);
                    fs.unlinkSync(outputFile);
                });

                stream.on('error', (streamErr) => {
                    console.error(`Stream error: ${streamErr}`);
                    res.status(500).send('Error streaming the file');
                    fs.unlinkSync(fileData);
                    fs.unlinkSync(outputFile);
                });
            });
        } else {
            res.status(400).send('Invalid file or parameters');
        }
    });

    req.pipe(bb);
};

export default TrimVideo;

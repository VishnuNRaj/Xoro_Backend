"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_media_server_1 = __importDefault(require("node-media-server"));
const path_1 = __importDefault(require("path"));
// import fs from 'fs';
// import ffmpeg from 'fluent-ffmpeg';
// const saveStreamAsMP4 = (streamPath: string, outputPath: string) => {
//   ffmpeg(streamPath)
//     .outputOptions('-c copy')
//     .outputFormat('mp4')
//     .outputOptions([
//       '-movflags faststart',
//       '-movflags frag_keyframe+empty_moov',
//     ])
//     .addOption('-bsf:a', 'aac_adtstoasc')
//     .on('error', (err) => {
//       console.error(`Error during conversion: ${err.message}`);
//     })
//     .on('end', () => {
//       console.log('Stream saved as MP4 successfully');
//     })
//     .save(outputPath);
// }
const config = {
    rtmp: {
        port: 2520,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
        allow_origin: "*"
    },
    http: {
        port: 6067,
        allow_origin: "*",
        mediaroot: path_1.default.join(__dirname, '../Public'),
        api: true,
    },
    trans: {
        ffmpeg: "/usr/bin/ffmpeg",
        tasks: [
            {
                app: 'videos',
                vc: 'copy', // Copy video codec
                ac: 'copy', // Copy audio codec
                rtmp: true,
                hls: true,
                hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[seg_duration=10]',
                dvr: true,
                dvrFlags: '[segment_time=10:break_non_keyframes=1]',
                fission: true,
                hlsKeep: true,
            }
        ],
        mediaRoot: path_1.default.join(__dirname, "../Public")
    },
    dvr: {
        ffmpeg: "/usr/bin/ffmpeg",
        tasks: [
            {
                app: 'videos',
                root: path_1.default.join(__dirname, '../Public'),
                saveType: 'flv',
                saveMode: 'append',
            },
        ],
    },
    fission: {
        ffmpeg: "/usr/bin/ffmpeg",
        tasks: [
            {
                rule: "videos/*",
                model: [
                    {
                        ab: "128k",
                        vb: "1500k",
                        vs: "1280x720",
                        vf: "30",
                    },
                    {
                        ab: "96k",
                        vb: "1000k",
                        vs: "854x480",
                        vf: "24",
                    },
                    {
                        ab: "96k",
                        vb: "600k",
                        vs: "640x360",
                        vf: "20",
                    },
                ],
            },
        ],
    },
};
// hls_flags=program_date_time:playlist_type=event:
const nms = new node_media_server_1.default(config);
nms.on('donePublish', (_id, StreamPath, _args) => {
    console.log(`[donePublish] StreamPath: ${StreamPath}`);
    // if (StreamPath.startsWith("/uploading")) {
    //   const m3u8Path = path.join(__dirname, '../Public', StreamPath, 'index.m3u8');
    //   if (fs.existsSync(m3u8Path)) {
    //     const outputPath = path.join(__dirname, '../Public/videos', `${StreamPath}.mp4`);
    //     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    //     console.log(`Saving stream to flv: ${outputPath}`);
    //     saveStreamAsMP4(m3u8Path, outputPath);
    //   } else {
    //     console.error(`Invalid .m3u8 file path: ${m3u8Path}`);
    //     const outputPath = path.join(__dirname, '../Public/videos', `${StreamPath}.mp4`);
    //     fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    //     console.log(`Saving stream to flv: ${outputPath}`);
    //     saveStreamAsMP4(m3u8Path, outputPath);
    //   }
    // }
});
nms.on('postPublish', (_id, StreamPath, _args) => {
    console.log(`[postPublish] StreamPath: ${StreamPath}`);
});
nms.on('preDVR', (_id, StreamPath, _args) => {
    console.log(`[preDVR] StreamPath: ${StreamPath}`);
});
nms.on('doneDVR', (_id, StreamPath, _args) => {
    console.log(`[doneDVR] StreamPath: ${StreamPath}`);
});
nms.run();
// import("http").then((response) => {
//   response.createServer(app).listen(8080, () => console.log("...Server running at port 8080..."))
// })

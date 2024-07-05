"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_media_server_1 = __importDefault(require("node-media-server"));
const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 6067,
        allow_origin: '*',
        mediaroot: './Live',
        api: true
    },
    trans: {
        ffmpeg: '/usr/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
            }
        ]
    },
    dvr: {
        app: 'live',
        root: './Live',
        saveType: 'mp4',
        saveMode: 'append'
    }
};
const nms = new node_media_server_1.default(config);
nms.on('postPublish', (id, StreamPath, args) => {
    console.log(`[NodeEvent on postPublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
nms.on('donePublish', (id, StreamPath, args) => {
    console.log(`[NodeEvent on donePublish] id=${id} StreamPath=${StreamPath}`);
});
nms.run();

import NodeMediaServer from 'node-media-server';
import path from 'path';

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
    mediaroot: path.join(__dirname, '../Public'),
    api: true,
  },
  trans: {
    ffmpeg: "/usr/bin/ffmpeg",
    tasks: [
      {
        app: 'videos',
        vc: 'copy', 
        ac: 'copy',  
        rtmp: true,
        hls: true,
        hlsFlags: '[hls_time=10:hls_list_size=0:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[seg_duration=10]',
        dvr: true,
        dvrFlags: '[segment_time=10:break_non_keyframes=1]',
        fission: true,
        hlsKeep: true,
      }, {
        app: 'shorts',
        vc: 'copy', 
        ac: 'copy',  
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
    mediaRoot: path.join(__dirname, "../Public")
  },
  dvr: {
    ffmpeg: "/usr/bin/ffmpeg",
    tasks: [
      {
        app: 'videos',
        root: path.join(__dirname, '../Public'),
        saveType: 'flv',
        saveMode: 'append',
      },
      {
        app: 'shorts',
        root: path.join(__dirname, '../Public'),
        saveType: 'flv',
        saveMode: 'append',
      },
    ],
  },
};
const nms = new NodeMediaServer(config);

nms.on('donePublish', (_id, StreamPath, _args) => {
  console.log(`[donePublish] StreamPath: ${StreamPath}`);
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

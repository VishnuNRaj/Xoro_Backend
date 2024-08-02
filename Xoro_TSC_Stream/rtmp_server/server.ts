import NodeMediaServer from 'node-media-server';
import path from 'path';
import mongooseConfig, { Live } from "../Mongoose"
import { saveLiveStream } from './Functions';
import ConfigFile from "../config" 
mongooseConfig()
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
      }, {
        app: 'live',
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
      {
        app: 'live',
        root: path.join(__dirname, '../Public'),
        saveType: 'flv',
        saveMode: 'append',
      },
    ],
  },
};
const nms = new NodeMediaServer(config);

nms.on('donePublish', async (_id, StreamPath, _args) => {
  console.log(`[donePublish] StreamPath: ${StreamPath}`);
  const Key = StreamPath.split("/")[2]
  console.log(Key, "{{{{KEY}}}}")
  if (StreamPath.startsWith("/live")) {
    if (!Key) {
      return console.log("No Key")
    }
    const savePath = path.join(__dirname, `../Public/saved/${Key}.flv`);
    const hlsPath = path.join(__dirname, `../Public/live/${Key}/index.m3u8`);
    saveLiveStream(hlsPath, savePath);
    // await Live.findOneAndUpdate({ Key: Key }, { $set: { Completed: true, Live: false, Video: `${ConfigFile.BASE}/saved/${Key}.flv` } })
  }
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

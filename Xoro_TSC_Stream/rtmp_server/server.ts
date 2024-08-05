import NodeMediaServer from 'node-media-server';
import path from 'path';
import mongooseConfig, { Live } from "../Mongoose"
import { saveLiveStream } from './Functions';
import config from "./rtmpConfig"
import ConfigFile from '../config';
mongooseConfig()

const nms = new NodeMediaServer(config);

nms.on('donePublish', async (_id, StreamPath, _args) => {
  console.log(`[donePublish] StreamPath: ${StreamPath}`);
  const Key = StreamPath.split("/")[2]
  console.log(Key, "{{{{KEY}}}}")
  if (StreamPath.startsWith("/live")) {
    if (!Key) {
      return console.log("No Key")
    }
    const savePath = path.join(__dirname, `../../Public/saved/${Key}.flv`);
    const hlsPath = path.join(__dirname, `../../Public/live/${Key}/index.m3u8`);
    saveLiveStream(hlsPath, savePath);
    await Live.findOneAndUpdate({ Key: Key }, { $set: { Completed: true, Live: false, Video: `${ConfigFile.BASE}/saved/${Key}.flv` } })
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

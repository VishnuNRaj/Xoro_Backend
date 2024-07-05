import NodeMediaServer from 'node-media-server';

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
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=false]',
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

const nms = new NodeMediaServer(config);

nms.on('postPublish', (id, StreamPath, args) => {
  console.log(`[NodeEvent on postPublish] id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log(`[NodeEvent on donePublish] id=${id} StreamPath=${StreamPath}`);
});

nms.run();

import path from "path";
import ConfigFile from "../config"
const config = {
    rtmp: {
      port: parseInt(ConfigFile.RTMP),
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
      allow_origin: "*"
    },
    http: {
      port: parseInt(ConfigFile.HTTP),
      allow_origin: "*",
      mediaroot: path.join(__dirname, '../../Public'),
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
      mediaRoot: path.join(__dirname, "../../Public")
    },
    dvr: {
      ffmpeg: "/usr/bin/ffmpeg",
      tasks: [
        {
          app: 'videos',
          root: path.join(__dirname, '../../Public'),
          saveType: 'flv',
          saveMode: 'append',
        },
        {
          app: 'shorts',
          root: path.join(__dirname, '../../Public'),
          saveType: 'flv',
          saveMode: 'append', 
        },
        {
          app: 'live',
          root: path.join(__dirname, '../../Public'),
          saveType: 'flv',
          saveMode: 'append',
        },
      ],
    },
  };

  export default config
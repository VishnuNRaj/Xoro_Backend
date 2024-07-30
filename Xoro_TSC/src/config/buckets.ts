import config from "./config";

export interface buckets {
    bucketName: string;
    Videos: string;
    Live: string;
    Shorts:string;
}

const bucketConfig: buckets = {
    bucketName: config.LIVE || '',
    Live: 'live',
    Videos: 'videos',
    Shorts:"shorts"
}

export default bucketConfig;
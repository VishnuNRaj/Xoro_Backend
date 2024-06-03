import { config } from 'dotenv'
config()

export interface buckets {
    bucketName: string;
    Videos: string;
    Live: string;
}

const bucketConfig: buckets = {
    bucketName: process.env.AWS_ACCESS_BUCKET_NAME || '',
    Live: 'live/',
    Videos: 'videos/'
}

export default bucketConfig;
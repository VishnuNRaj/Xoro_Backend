import { config } from 'dotenv'
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
config()

const s3Credentilas = <S3ClientConfig>{
    region: process.env.AWS_ACCESS_REGION || '',
    credential: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET || '',
    }
} 

const s3: S3Client = new S3Client(s3Credentilas);

export default s3;




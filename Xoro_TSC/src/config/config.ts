import dotenv from 'dotenv';
dotenv.config();

interface ConfigInterface {
    PORT: number;
    MONGO: string;
    BASE:string;
    RTMP:string;
    LIVE:string;
}

const config: ConfigInterface = {
    PORT: parseInt(process.env.PORT || '3000'),
    MONGO: process.env.MONGO || '',
    BASE:process.env.BASE || '',
    RTMP:process.env.RTMP || "",
    LIVE:process.env.HTTP || ""

};

export default config;

import { config } from "dotenv";
config()
interface ConfigInterface {
    RTMP: string;
    HTTP: string;
    BASE: string;
    RTMP_URL: string;
    HTTP_URL: string;
    ORIGIN: string;
    SOCKET: string;
}
const ConfigFile = <ConfigInterface>{
    RTMP: process.env.RTMP_PORT,
    HTTP: process.env.HTTP_PORT,
    BASE: process.env.URL,
    RTMP_URL: process.env.RTMP,
    ORIGIN: process.env.API_1,
    SOCKET: process.env.SOCKET_PORT,
}

export default ConfigFile
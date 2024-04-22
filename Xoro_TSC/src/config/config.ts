import dotenv from 'dotenv';
dotenv.config();

interface ConfigInterface {
    PORT: number;
    MONGO: string;
}

const config: ConfigInterface = {
    PORT: parseInt(process.env.PORT || '3000'),
    MONGO: process.env.MONGO || ''
};

export default config;

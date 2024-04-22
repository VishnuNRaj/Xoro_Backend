import { v2 as cloudinaryV2 } from 'cloudinary'; 
import dotenv from 'dotenv';
dotenv.config();

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY || '',
  api_key: process.env.CLOUD_KEY || '',
  api_secret: process.env.CLOUD_SECRET || ''
};

cloudinaryV2.config(cloudinaryConfig);



export default cloudinaryV2
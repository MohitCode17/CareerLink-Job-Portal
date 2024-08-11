import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);

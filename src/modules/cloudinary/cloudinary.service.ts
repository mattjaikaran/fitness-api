import { Injectable } from '@nestjs/common';
var cloudinary = require('cloudinary');

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async uploadFile(f: any, folder: string): Promise<any> {
    const options = {
      unique_filename: true,
      folder: folder,
    };

    const file = await cloudinary.v2.uploader.upload(f.path, options);
    return file;
  }
}

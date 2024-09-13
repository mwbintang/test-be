import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileUploadService {
  private readonly uploadPath = './uploads';

  constructor() {
    // Ensure the uploads directory exists
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: any): Promise<string> {
    if (!file) {
      throw new HttpException('File is missing', HttpStatus.BAD_REQUEST);
    }

    const filePath = join(this.uploadPath, file.originalname);

    // You can apply additional logic here (e.g., saving metadata, renaming the file, etc.)

    return filePath; // return the file path or URL after saving it locally
  }
}

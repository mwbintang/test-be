import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Path where files will be stored
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname); // Extract the file extension
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${fileExtName}`); // Set the file name
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    const filePath = await this.fileUploadService.uploadFile(file);
    return {
      message: 'File uploaded successfully',
      filePath,
    };
  }
}

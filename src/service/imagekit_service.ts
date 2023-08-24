import { Injectable } from '@nestjs/common';

/* eslint-disable @typescript-eslint/no-var-requires */
const ImageKit = require('imagekit');

@Injectable()
export class ImageKitService {
  private imageKit = new ImageKit({
    publicKey: 'public_CMCgFOf9D3pqPgwQds/6LiHZIGw=',
    privateKey: 'private_5cgUPS2h9DLhrHP0gE2H5QObzzw=',
    urlEndpoint: 'https://ik.imagekit.io/spvc9dgvs/hotel',
  });
  async uploadFiles(file: Buffer, fileName: string): Promise<string> {
    try {
      const result = await this.imageKit.upload({
        file: file.buffer,
        fileName,
        folder: 'hotel/',
      });
      return result.url;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

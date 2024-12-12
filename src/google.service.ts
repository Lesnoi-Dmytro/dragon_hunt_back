import { BadRequestException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import GoogleResponse from './types/auth/googleResponse.type';
import axios from 'axios';
import { Readable } from 'stream';
import { ReadStream } from 'fs';
import { detectFile } from 'file-type-checker';

const SCOPES = ['https://www.googleapis.com/auth/drive'];

@Injectable()
export class GoogleService {
  private drive;

  constructor() {
    this.authorize();
  }

  private async authorize() {
    const jwtClient = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_EMAIL,
      null,
      process.env.GOOGLE_SERVICE_KEY,
      SCOPES,
    );
    await jwtClient.authorize();
    const auth = jwtClient;
    this.drive = google.drive({ version: 'v3', auth });
  }

  public async uploadFile(file: Buffer, name: string) {
    let fileType: { extension: string; mimeType: string } = detectFile(file);

    if (!fileType) {
      const bufferString = file.toString('utf8', 0, 50).trim();
      if (
        bufferString.startsWith('<svg') ||
        (bufferString.startsWith('<?xml') && bufferString.includes('<svg'))
      ) {
        fileType = { extension: 'svg', mimeType: 'image/svg+xml' };
      } else {
        throw new BadRequestException('Invalid file type');
      }
    }

    const readable = Readable.from(file);
    const uploadedFile = await this.drive.files.create({
      requestBody: {
        name: `${name}.${fileType.extension}`,
        parents: ['1bXNU3w1ndQ8nGxhlRq2Z-7_bP5auBcej'],
      },
      media: {
        mimeType: fileType.mimeType,
        body: readable,
      },
      fields: 'id',
    });

    return uploadedFile.data.id;
  }

  public async getFile(
    id: string,
  ): Promise<{ file: ReadStream; mimeType?: string } | null> {
    try {
      const res = await this.drive.files.get(
        { fileId: id, alt: 'media' },
        { responseType: 'stream' },
      );

      return {
        file: res.data,
        mimeType: res.headers['content-type'],
      };
    } catch (err) {
      console.log(err?.message);
      return null;
    }
  }

  public async deleteFile(id: string) {
    try {
      await this.drive.files.delete({ fileId: id });
    } catch (err) {
      console.log(err?.message);
    }
  }

  public async getUserData(access_token: string): Promise<GoogleResponse> {
    return await (
      await axios.get<GoogleResponse>(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: 'Bearer ' + access_token },
        },
      )
    ).data;
  }
}

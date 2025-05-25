// types/next.d.ts


import { Express } from 'express';

declare module 'next' {
  export interface NextApiRequest {
    file: Express.Multer.File; // Add the file property that multer provides
  }
}
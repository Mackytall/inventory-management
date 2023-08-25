import multer from 'fastify-multer';
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

export const s3 = new S3Client({
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    secretAccessKey: process.env.BUCKET_SECRET ?? '',
    accessKeyId: process.env.BUCKET_ACCESS ?? '',
  },
  region: 'fr-par',
  forcePathStyle: true,
});

const storageS3 = multerS3({
  // @ts-expect-error Les types sont bien correctes mais multerS3 n'est pas à jour avec le nouveau S3Client
  s3,
  bucket: 'mektaba',
  acl: 'public-read',
  cacheControl: 'max-age=31536000',
  key: (req, file, callback) => {
    const name = file.originalname
      .split(' ')
      .join('_')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    callback(null, Date.now() + uuidv4() + name);
  },
});

export default multer({
  // @ts-expect-error: les types sont bien correctes
  storage: process.env.NODE_ENV !== 'test' ? storageS3 : undefined,
  fileFilter: (req, files, callback) => {
    if (files.mimetype.includes('image/')) {
      callback(null, true);
    } else {
      const error = new Error('La photo doit être une image');
      callback(error, undefined); // handle error in middleware, not here
    }
  },
  limits: {
    fileSize: 2e6,
  },
}).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);

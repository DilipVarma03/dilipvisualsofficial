import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// Allowed file types: images, videos, audio, pdfs, archives, docs
const allowedMimes = [
  'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm',
  'audio/mpeg', 'audio/wav', 'audio/aac',
  'application/pdf', 'application/zip', 'application/x-zip-compressed',
  'application/vnd.rar', 'application/x-rar-compressed',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/octet-stream'
];

export const fileUpload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB max file size
  },
  fileFilter: (_req, file, cb) => {
    if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(mp4|mov|avi|png|jpg|jpeg|webp|pdf|zip|rar|psd|ai|prproj|aep)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload video, audio, image, PDF, or ZIP/RAR archives.'));
    }
  }
});

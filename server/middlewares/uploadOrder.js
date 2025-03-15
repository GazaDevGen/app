import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../client/images');


if (!fs.existsSync(uploadDir)) {
  console.log("Directory does not exist, creating...");
  fs.mkdirSync(uploadDir, { recursive: true });
} else {
  console.log("Directory exists!");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

export default upload;

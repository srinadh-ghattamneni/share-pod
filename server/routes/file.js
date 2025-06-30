import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import File from '../models/File.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  console.log('➡️ /upload endpoint hit');

  try {
    const file = req.file;

    if (!file) {
      console.log('❌ No file received in request');
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    console.log('📁 Received file:', {
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    });

    const uploadOptions = {
      resource_type: 'auto',
      use_filename: true,
      unique_filename: false,
      folder: 'sharepod', // optional: organizes uploads
      transformation: [{ flags: 'attachment' }], // 👈 force download
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      async (error, result) => {
        if (error) {
          console.error('❌ Cloudinary Upload Error:', error);
          return res.status(500).json({ error });
        }

        // Optional fallback in case transformation is ignored
        const forcedDownloadURL = result.secure_url.replace(
          '/upload/',
          '/upload/fl_attachment/'
        );

        console.log('✅ File uploaded to Cloudinary:', forcedDownloadURL);

        try {
          const newFile = await File.create({
            user: req.user,
            filename: file.originalname,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            type: file.mimetype,
            url: forcedDownloadURL, // Use forced download URL
          });

          console.log('✅ File saved to DB:', newFile._id);
          res.json(newFile);
        } catch (dbError) {
          console.error('❌ DB Save Error:', dbError);
          res.status(500).json({ error: dbError.message });
        }
      }
    );

    stream.end(file.buffer);
  } catch (err) {
    console.error('❌ General Upload Error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/my-files', auth, async (req, res) => {
  console.log('➡️ /my-files endpoint hit');
  try {
    const files = await File.find({ user: req.user }).sort({ createdAt: -1 });

    console.log(`📄 Found ${files.length} file(s) for user ${req.user}`);
    res.json(files);
  } catch (err) {
    console.error('❌ Error fetching files:', err);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

export default router;

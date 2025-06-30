import File from '../models/File.js';

export const deleteOldFiles = async () => {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hrs

  const expiredFiles = await File.find({ createdAt: { $lt: cutoff } });
  for (const file of expiredFiles) {
    // Optionally: delete from Cloudinary if needed
    await File.deleteOne({ _id: file._id });
  }
};

import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename:  { type: String },
  size:      { type: String },
  type:      { type: String },
  url:       { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', fileSchema);

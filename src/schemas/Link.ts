import mongoose from 'mongoose';
import type { LinkModelInterface } from '../interfaces/links';

const LinkSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: {
    icon_url: { type: String, required: true },
    hover_text: String,
    alt_text: String,
  },
  username: { type: String, required: true },
});

export default mongoose.model<LinkModelInterface>('link', LinkSchema);

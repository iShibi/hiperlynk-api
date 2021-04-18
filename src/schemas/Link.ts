import mongoose from 'mongoose';
import type { LinkModelInterface } from '../interfaces/links';

const LinkSchema: mongoose.Schema = new mongoose.Schema({
  name: String,
  url: String,
  icon: {
    icon_url: String,
    hover_text: String,
    alt_text: String,
  },
});

export default mongoose.model<LinkModelInterface>('link', LinkSchema);
